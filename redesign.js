document.documentElement.classList.add('js');
const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#nav-links');
function closeMenu(){toggle.setAttribute('aria-expanded','false');menu.classList.remove('open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.classList.toggle('open',open);});
menu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('header'))closeMenu();});
matchMedia('(min-width:761px)').addEventListener('change',closeMenu);
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}},{threshold:.12});document.querySelectorAll('.service-card,.features>div,.statement').forEach(el=>observer.observe(el));}
const form=document.querySelector('#contact-form');
if(form){
  const config=window.SITE_CONFIG||{},status=document.querySelector('#form-status'),submit=form.querySelector('button[type=submit]');
  const date=form.elements.preferredDate;
  const localDate=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'});
  if(date){date.min=localDate.format(new Date());date.max=localDate.format(new Date(Date.now()+365*86400000));}
  const selected=new URLSearchParams(location.search).get('service');
  if([...form.elements.service.options].some(o=>o.value===selected))form.elements.service.value=selected;
  let busy=false,captchaToken='',widgetId=null,securityStarted=false;
  const show=message=>{status.textContent=message;};
  function startSecurity(){
    if(securityStarted||!config.turnstileSiteKey)return;
    securityStarted=true;
    const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;
    script.onload=()=>{
      if(!window.turnstile){show('Security verification could not load. Please retry or call the team.');return;}
      try{widgetId=window.turnstile.render('#security-check',{sitekey:config.turnstileSiteKey,action:'appointment',theme:'light',size:'compact',
        callback:token=>{captchaToken=token;},
        'expired-callback':()=>{captchaToken='';show('Security verification expired. Please complete it again.');},
        'error-callback':()=>{captchaToken='';show('Security verification failed. Please retry or call the team.');}
      });}catch{show('Security verification is unavailable. Please reload or call the team.');}
    };
    script.onerror=()=>{show('Security verification could not load. Please reload or call the team.');};document.head.append(script);
  }
  form.addEventListener('focusin',startSecurity);
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(busy||!form.reportValidity())return;
    if(!config.formEndpoint||!config.turnstileSiteKey){show('Online sending is not configured yet. Please call either number shown on this page. Your inquiry has not been sent.');return;}
    const payload={name:form.elements.name.value.trim(),email:form.elements.email.value.trim(),phone:form.elements.phone.value.trim(),preferredDate:date.value,service:form.elements.service.value,message:form.elements.message.value.trim(),consent:form.elements.consent.checked,website:form.elements.website.value,turnstileToken:captchaToken};
    if(/\b\d{3}[- ]\d{2}[- ]\d{4}\b|\b\d{9}\b|\b(?:ssn|social security|passport number|alien registration number|a-number|fingerprint data|bank account number)\b/i.test(payload.name+' '+payload.message)){
      show('Please remove sensitive personal or document information. Use this form only for a general appointment inquiry. Nothing has been sent.');form.elements.message.focus();return;
    }
    if(!captchaToken){startSecurity();show('Please complete the security verification before sending.');return;}
    let endpoint;
    try{endpoint=new URL(config.formEndpoint,location.origin);if(endpoint.origin!==location.origin)throw Error();}catch{show('Online sending is unavailable. Please call the team.');return;}
    busy=true;form.setAttribute('aria-busy','true');
    const controls=[...form.querySelectorAll('input,select,textarea,button')].filter(el=>!el.disabled);controls.forEach(el=>{el.disabled=true;});
    submit.textContent='Sending…';show('Sending your appointment inquiry…');
    try{
      const response=await fetch(endpoint,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(45000)});
      let result;try{result=await response.json();}catch{throw Error('unavailable');}
      if(!response.ok||result.ok!==true||result.status!=='accepted'){
        show(typeof result.message==='string'?result.message:'Your inquiry could not be confirmed as received. Please retry or call the team.');return;
      }
      show('Your inquiry has been accepted for email delivery to our team. This is not a confirmed appointment; the business must confirm availability separately.');form.reset();
    }catch{show('We could not confirm email delivery. Please retry shortly or call the team. Your entries are still here.');}
    finally{busy=false;form.removeAttribute('aria-busy');controls.forEach(el=>{el.disabled=false;});submit.innerHTML='Send inquiry <span aria-hidden="true">↗</span>';captchaToken='';if(widgetId!==null){try{window.turnstile.reset(widgetId);}catch{show('Please reload the page before sending another inquiry.');}}}
  });
}
