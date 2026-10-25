import {createHmac} from 'node:crypto';
export class InquiryError extends Error {
  constructor(status, code, message) { super(message); Object.assign(this,{status,code}); }
}
const fail=(code,message)=>{throw new InquiryError(400,code,message);};
export const emailValid=value=>typeof value==='string'&&value.length<=254&&/^[^\s<>@,;\r\n]+@[^\s<>@,;\r\n]+\.[^\s<>@,;\r\n]+$/.test(value);
export function containsSensitiveData(value) {
  return /\b\d{3}[- ]\d{2}[- ]\d{4}\b|\b\d{9}\b|\b(?:ssn|social security|passport number|alien registration number|a-number|fingerprint data|bank account number)\b/i.test(value);
}
export function validateInquiry(body, services, now=Date.now()) {
  if(!body||Array.isArray(body)||typeof body!=='object')fail('invalid_form','Please complete the appointment form.');
  const keys=['name','email','phone','preferredDate','service','message','consent','website','turnstileToken'];
  if(Object.keys(body).some(key=>!keys.includes(key)))fail('invalid_form','Only general inquiry fields are accepted. Attachments are not allowed.');
  if(body.website!==undefined&&body.website!=='')fail('spam_rejected','The inquiry could not be accepted. Please call the business.');
  const out={};
  for(const [key,max] of [['name',100],['email',254],['phone',40],['preferredDate',10],['service',80],['message',1000]]){
    if(typeof body[key]!=='string')fail('invalid_form','Please complete all required fields.');
    out[key]=body[key].trim().normalize('NFC');
    if(!out[key]||out[key].length>max||/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(out[key]))fail('invalid_form','Please check the form fields and their lengths.');
  }
  if(/[\r\n]/.test(out.name)||!emailValid(out.email))fail('invalid_email','Please enter a valid email address and name.');
  out.email=out.email.toLowerCase();
  if(!/^\+?[0-9() .-]+$/.test(out.phone)||out.phone.replace(/\D/g,'').length<10||out.phone.replace(/\D/g,'').length>15)fail('invalid_phone','Please enter a valid phone number, including area code.');
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now));
  const date=new Date(out.preferredDate+'T12:00:00Z');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(out.preferredDate)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==out.preferredDate||out.preferredDate<today||date.getTime()>now+366*86400000)fail('invalid_date','Choose a valid preferred date within the next year. Availability must be confirmed separately.');
  if(!Object.hasOwn(services,out.service))fail('invalid_service','Choose an available service.');
  if(body.consent!==true)fail('consent_required','Privacy policy consent is required.');
  if(containsSensitiveData(out.name+' '+out.message))fail('sensitive_data','Remove sensitive personal or document information. This form is for general appointment inquiries only.');
  if(typeof body.turnstileToken!=='string'||!body.turnstileToken||body.turnstileToken.length>2048)fail('verification_required','Please complete the security verification.');
  return {...out,consent:true};
}
export function readConfig(env) {
  const required=['RESEND_API_KEY','TURNSTILE_SECRET_KEY','RATE_LIMIT_SALT','INQUIRY_TO_EMAIL','INQUIRY_FROM_EMAIL','INQUIRY_ALLOWED_ORIGINS'];
  if(required.some(k=>!env[k])||env.RATE_LIMIT_SALT.length<32||!emailValid(env.INQUIRY_TO_EMAIL)||!emailValid(env.INQUIRY_FROM_EMAIL))throw new InquiryError(503,'not_configured','Online sending is unavailable. Please call the business.');
  const origins=env.INQUIRY_ALLOWED_ORIGINS.split(',').map(x=>x.trim()).filter(Boolean);
  if(!origins.length||origins.some(value=>{try{const u=new URL(value);return u.origin!==value||!(u.protocol==='https:'||(env.FUNCTIONS_EMULATOR==='true'&&u.protocol==='http:'&&['localhost','127.0.0.1'].includes(u.hostname)));}catch{return true;}}))throw new InquiryError(503,'not_configured','Online sending is unavailable. Please call the business.');
  // Cloudflare test secrets must never silently disable production bot verification.
  if(env.FUNCTIONS_EMULATOR!=='true'&&/^[123]x0{29,}/.test(env.TURNSTILE_SECRET_KEY))throw new InquiryError(503,'not_configured','Online sending is unavailable. Please call the business.');
  return {...env,origins};
}
export function createAppointmentHandler({getConfig,services,store,verifyCaptcha,sendEmail,now=Date.now,log=()=>{}}) {
  return async(req,res)=>{
    res.set('Cache-Control','no-store');res.set('X-Content-Type-Options','nosniff');
    try{
      if(req.method!=='POST'){res.set('Allow','POST');throw new InquiryError(405,'method_not_allowed','Use the appointment form to submit an inquiry.');}
      const config=readConfig(getConfig());
      const origin=req.get('Origin');
      if(!origin||!config.origins.includes(origin))throw new InquiryError(403,'origin_rejected','This request could not be accepted. Please use the business website.');
      if(!/^application\/json(?:;|$)/i.test(req.get('Content-Type')||''))throw new InquiryError(415,'invalid_content_type','Submit the form as JSON. Attachments are not accepted.');
      if((req.rawBody?.length??Buffer.byteLength(JSON.stringify(req.body??{})))>8192)throw new InquiryError(413,'too_large','The inquiry is too large. Please use a brief general message.');
      const stamp=now(),inquiry=validateInquiry(req.body,services,stamp);
      const hash=value=>createHmac('sha256',config.RATE_LIMIT_SALT).update(value).digest('hex');
      // Canonical normalized details deduplicate retries, double clicks and identical new requests.
      const key=hash(JSON.stringify([inquiry,config.INQUIRY_TO_EMAIL,config.INQUIRY_FROM_EMAIL]));
      const reservation=await store.reserve({key,ipKey:hash('ip:'+req.ip),emailKey:hash('email:'+inquiry.email),now:stamp});
      if(reservation==='sent'){res.status(200).json({ok:true,status:'accepted',duplicate:true});return;}
      let accepted=false;
      try{
        await verifyCaptcha({token:req.body.turnstileToken,origin,config});
        const result=await sendEmail({inquiry,serviceName:services[inquiry.service],config,idempotencyKey:'appointment/'+key});
        if(!result?.id)throw new InquiryError(502,'email_failed','Email delivery could not be accepted. Please retry or call the business.');
        accepted=true;
        await store.sent(key,result.id,stamp);
        res.status(200).json({ok:true,status:'accepted'});
      }catch(error){
        if(!accepted)await store.failed(key).catch(()=>{});
        throw error;
      }
    }catch(error){
      const known=error instanceof InquiryError;
      if(!known)log('appointment_error'); // Never log submitted fields, raw IPs, tokens or provider responses.
      const status=known?error.status:503;
      if(status===429)res.set('Retry-After','900');
      if(error.code==='in_progress')res.set('Retry-After','60');
      res.status(status).json({ok:false,code:known?error.code:'temporarily_unavailable',message:known?error.message:'We could not confirm email delivery. Please retry shortly or call the business.'});
    }
  };
}
