import {InquiryError} from './appointment.js';
export async function verifyCaptcha({token,origin,config},fetcher=fetch) {
  let response,data;
  try{
    response=await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:config.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(8000)});
    data=await response.json();
  }catch{throw new InquiryError(503,'verification_unavailable','Security verification is unavailable. Please retry shortly.');}
  const expectedHost=new URL(origin).hostname;
  if(!response.ok||!data.success||data.action!=='appointment'||data.hostname!==expectedHost)throw new InquiryError(400,'verification_failed','Security verification expired or failed. Please complete it again.');
}
export async function sendEmail({inquiry,serviceName,config,idempotencyKey},fetcher=fetch) {
  const text=["New appointment inquiry — VJ’s Multi-Services Center",'',
    'This is an inquiry, not a confirmed appointment.',
    `Name: ${inquiry.name}`,`Email: ${inquiry.email}`,`Phone: ${inquiry.phone}`,
    `Preferred appointment date (Sacramento): ${inquiry.preferredDate}`,`Service: ${serviceName}`,
    '', 'General message:',inquiry.message,'','Privacy policy consent: Yes. Inquiry contact only; no marketing consent.'].join('\n');
  try{
    const response=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+config.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':idempotencyKey},body:JSON.stringify({from:config.INQUIRY_FROM_EMAIL,to:[config.INQUIRY_TO_EMAIL],reply_to:inquiry.email,subject:'Appointment inquiry — '+serviceName,text}),signal:AbortSignal.timeout(15000)});
    const result=await response.json();
    if(!response.ok||typeof result.id!=='string'||!result.id)throw new Error();
    return {id:result.id};
  }catch{throw new InquiryError(502,'email_failed','Email delivery could not be confirmed. Please retry shortly or call the business.');}
}
