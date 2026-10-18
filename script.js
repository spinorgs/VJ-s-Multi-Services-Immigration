// Homepage configuration. Placeholder values never become live contact links.
const siteConfig = window.SITE_CONFIG || {};
const configuredText = value => typeof value === 'string' && value.trim() && !/\[ADD_[^\]]*\]/.test(value) ? value.trim() : '';
const businessName = configuredText(siteConfig.businessName);
if (businessName) {
  document.title = `${businessName} | Immigration, Tax, Live Scan & Notary`;
  document.querySelectorAll('[data-config-home-label]').forEach(link => {
    link.setAttribute('aria-label', `${businessName} home`);
  });
}
document.querySelectorAll('[data-config-text]').forEach(element => {
  const value = configuredText(siteConfig[element.dataset.configText]);
  if (value) element.textContent = value;
});
const slotSelect = document.querySelector('[data-config-slots]');
if (slotSelect && Array.isArray(siteConfig.appointmentSlots)) {
  const slots = [...new Set(siteConfig.appointmentSlots.map(configuredText).filter(Boolean))];
  slotSelect.replaceChildren(new Option('Select a time slot', ''), ...slots.map(slot => new Option(slot, slot)));
}

const header = document.querySelector('#header');
const toggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus();}});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();});
const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>20);window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver' in window){document.documentElement.classList.add('js-reveal');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
const form=document.querySelector('#consultation-form');const service=form.elements.service;const feePanel=form.querySelector('.fee-panel');const feeAck=form.elements.legalFeeAcknowledged;
function syncFee(){const legal=service.value==='Legal Consultation Coordination';feePanel.hidden=!legal;feeAck.required=legal;if(!legal)feeAck.checked=false;}
service.addEventListener('change',syncFee);syncFee();
const date=new Date();form.elements.date.min=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
form.addEventListener('submit',event=>{event.preventDefault();syncFee();if(!form.reportValidity())return;const data=new FormData(form);const lines=[['First name','firstName'],['Last name','lastName'],['Email','email'],['Phone','phone'],['Service','service'],['Preferred date','date'],['Preferred time','time'],['Message','message']].map(([label,key])=>`${label}: ${data.get(key)||'Not specified'}`);if(feeAck.checked)lines.push('Legal consultation fee acknowledged: Yes ($250)');const subject='Consultation Request - VJ’s Immigration Consultant';window.location.href=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;form.querySelector('.form-status').textContent='Your email draft is ready to open in your email app. Add the business recipient, then send it. This request has not been submitted automatically.';});

// Carry the visitor's chosen starting point into the existing consultation form.
document.querySelectorAll('[data-request-service]').forEach(link=>{
  link.addEventListener('click',()=>{
    service.value=link.dataset.requestService;
    syncFee();
    const note=form.querySelector('.selected-service-note');
    note.textContent=`Let’s talk about ${service.options[service.selectedIndex].text}. You can change your service below.`;
    note.hidden=false;
  });
});

// Requests from local service pages continue in the homepage consultation form.
const requestedService=new URLSearchParams(window.location.search).get('service');
if(requestedService&&Array.from(service.options).some(option=>option.value===requestedService)){
  service.value=requestedService;
  syncFee();
  const note=form.querySelector('.selected-service-note');
  note.textContent=`Let’s talk about ${service.options[service.selectedIndex].text}. You can change your service below.`;
  note.hidden=false;
}
