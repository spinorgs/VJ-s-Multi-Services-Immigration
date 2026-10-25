import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const firebase=JSON.parse(await readFile(path.join(root,'firebase.json'),'utf8'));
const context={window:{}};vm.runInNewContext(await readFile(path.join(root,'site-config.js'),'utf8'),context);
const hosting=firebase.hosting;
if(!context.window.SITE_CONFIG.turnstileSiteKey){
  hosting.rewrites=(hosting.rewrites||[]).filter(rule=>rule.source!=='/api/appointment');
  console.log('Appointment sending is unconfigured; publishing website without the API rewrite.');
}
await writeFile(path.join(root,'.firebase-hosting-release.json'),JSON.stringify({hosting},null,2)+'\n');
