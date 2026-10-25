import {onRequest} from 'firebase-functions/v2/https';
import {defineSecret} from 'firebase-functions/params';
import {initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {readFileSync} from 'node:fs';
import {createAppointmentHandler} from './appointment.js';
import {createFirestoreStore} from './store.js';
import {verifyCaptcha,sendEmail} from './providers.js';
initializeApp();
const resendKey=defineSecret('RESEND_API_KEY');
const captchaKey=defineSecret('TURNSTILE_SECRET_KEY');
const rateSalt=defineSecret('RATE_LIMIT_SALT');
const services=JSON.parse(readFileSync(new URL('./service-catalog.json',import.meta.url),'utf8'));
export const appointmentInquiry=onRequest({region:'us-west1',invoker:'public',secrets:[resendKey,captchaKey,rateSalt],cors:false,maxInstances:3,concurrency:20,timeoutSeconds:60,memory:'256MiB'},createAppointmentHandler({
  getConfig:()=>({...process.env,RESEND_API_KEY:resendKey.value(),TURNSTILE_SECRET_KEY:captchaKey.value(),RATE_LIMIT_SALT:rateSalt.value()}),
  services,store:createFirestoreStore(getFirestore()),verifyCaptcha,sendEmail,
  log:code=>console.error(JSON.stringify({code}))
}));
