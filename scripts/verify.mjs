import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
async function walk(dir){let out=[];for(const n of await readdir(dir)){const f=path.join(dir,n);out.push(...(await stat(f)).isDirectory()?await walk(f):[f]);}return out;}
const files=await walk(root);let links=0;
for(const file of files.filter(f=>f.endsWith('.html'))){const html=await readFile(file,'utf8');assert.match(html,/<title>.+<\/title>/);assert.match(html,/name="description"/);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file);assert.match(html,/name="viewport"/);
for(const [,href]of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|tel:|mailto:)/.test(href))continue;const [relative,anchor]=href.split('#');const target=path.resolve(path.dirname(file),relative.split('?')[0]||path.basename(file));assert.ok(files.includes(target),`${file}: missing ${href}`);if(anchor){const targetHtml=await readFile(target,'utf8');assert.ok(targetHtml.includes(`id="${anchor}"`),`${file}: missing anchor ${href}`);}links++;}}
for(const name of ['immigration','notary','live-scan','legal-coordination']){const html=await readFile(path.join(root,'services',name+'.html'),'utf8');assert.doesNotMatch(html,/noindex|\$250|next-step planning/);}
const immigration=await readFile(path.join(root,'services/immigration.html'),'utf8');assert.match(immigration,/No immigration consultation or form preparation is offered/);
const legal=await readFile(path.join(root,'services/legal-coordination.html'),'utf8');assert.match(legal,/apps.calbar.ca.gov/);assert.match(legal,/do not match customers/);
const bail=await readFile(path.join(root,'services/bail-bond.html'),'utf8');assert.match(bail,/noindex/);
const config=await readFile('site-config.js','utf8');assert.match(config,/#100B/);
const home=await readFile(path.join(root,'index.html'),'utf8');assert.doesNotMatch(home,/\$250|ITIN|government approved|name="time"/);assert.ok(!files.some(f=>/COMPLIANCE|AUDIT|original/.test(f)));console.log(`Verified ${files.filter(f=>f.endsWith('.html')).length} pages, ${links} local links/assets, service scope safeguards and build exclusions.`);

assert.ok(!files.some(f=>/\/(?:functions|node_modules)\//.test(f)||/\/\.(?:env|secret)/.test(f)),'Server source/config must never enter Hosting output');
