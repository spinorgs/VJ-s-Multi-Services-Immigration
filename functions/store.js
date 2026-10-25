import {InquiryError} from './appointment.js';
const hours=n=>n*3600000;
export function createFirestoreStore(db) {
  const inquiries=db.collection('appointmentRequests'),limits=db.collection('appointmentRateLimits');
  return {
    async reserve({key,ipKey,emailKey,now}) {
      const request=inquiries.doc(key);
      const windows=[{id:'ip-'+ipKey,window:900000,max:5},{id:'email-'+emailKey,window:hours(1),max:3},{id:'global',window:hours(24),max:100}];
      const refs=windows.map(w=>limits.doc(w.id+'-'+Math.floor(now/w.window)));
      return db.runTransaction(async tx=>{
        const [existing,...counters]=await Promise.all([tx.get(request),...refs.map(ref=>tx.get(ref))]);
        const prev=existing.exists?existing.data():null;
        if(prev?.status==='sent')return 'sent';
        if(prev?.leaseUntil>now)throw new InquiryError(409,'in_progress','This inquiry is already being processed. Please wait a minute before retrying.');
        // Resend keys last 24h. Refuse ambiguous old retries instead of risking a second notification.
        if(prev&&now-prev.firstAt>hours(20))throw new InquiryError(409,'retry_window_expired','This inquiry needs a delivery check. Please call the business before sending it again.');
        if(counters.some((snap,i)=>(snap.data()?.count||0)>=windows[i].max))throw new InquiryError(429,'rate_limited','Too many attempts. Please wait before trying again, or call the business.');
        refs.forEach((ref,i)=>tx.set(ref,{count:(counters[i].data()?.count||0)+1,expiresAt:new Date(now+hours(48))}));
        tx.set(request,{status:'processing',firstAt:prev?.firstAt??now,leaseUntil:now+60000,expiresAt:new Date(now+hours(48))});
        return 'reserved';
      });
    },
    async sent(key,providerId,now){await inquiries.doc(key).update({status:'sent',providerId,leaseUntil:0,acceptedAt:now});},
    async failed(key){await inquiries.doc(key).update({status:'failed',leaseUntil:0});}
  };
}
