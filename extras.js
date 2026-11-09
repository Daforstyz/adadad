(()=>{const D=document,R=matchMedia('(prefers-reduced-motion:reduce)').matches,home=!!D.getElementById('world');
const css=`.fb{position:fixed;bottom:-70px;z-index:0;pointer-events:none;border-radius:2px 4px 4px 2px;opacity:.16;background:var(--c);box-shadow:inset 4px 0 0 rgba(255,255,255,.25),inset -2px 0 0 rgba(0,0,0,.3);animation:rise var(--t) linear infinite;animation-delay:var(--dl)}
.fb::after{content:"";position:absolute;left:30%;right:14%;top:18%;height:3px;background:rgba(255,255,255,.4);box-shadow:0 7px 0 rgba(255,255,255,.25)}
@keyframes rise{to{transform:translateY(-125vh) rotate(var(--r))}}main,.login{position:relative;z-index:1}
.cb{position:fixed;right:20px;bottom:20px;z-index:50;width:58px;height:58px;border-radius:50%;border:0;background:#ff3d58;color:#12060a;cursor:pointer;display:grid;place-items:center;box-shadow:0 14px 34px -10px rgba(255,61,88,.8);transition:transform .2s}.cb:hover{transform:scale(1.08)}
.cb svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.cp{position:fixed;right:20px;bottom:90px;z-index:50;width:min(360px,calc(100vw - 32px));height:min(520px,70vh);display:none;flex-direction:column;background:rgba(28,11,18,.94);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12);border-radius:22px;box-shadow:0 40px 80px -24px #000;color:#f6eeee;font-family:Prompt,sans-serif;overflow:hidden}
.cp.o{display:flex;animation:pop .3s both}@keyframes pop{from{opacity:0;transform:translateY(14px) scale(.97)}}
.ch{padding:14px 18px;font-weight:600;background:#4a0c18;display:flex;justify-content:space-between}.ch button{background:none;border:0;color:inherit;cursor:pointer;font-size:1.2rem}
.cm{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.cm div{max-width:86%;padding:9px 14px;border-radius:16px;font-size:.9rem;line-height:1.55;white-space:pre-line;animation:pop .25s both}
.cm .b{background:rgba(255,255,255,.08);align-self:flex-start;border-bottom-left-radius:4px}.cm .u{background:#ff3d58;color:#12060a;align-self:flex-end;border-bottom-right-radius:4px}
.cq{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 10px}.cq button{border:1px solid rgba(255,255,255,.2);background:none;color:#f6eeee;border-radius:99px;padding:4px 12px;font:inherit;font-size:.8rem;cursor:pointer}.cq button:hover{background:#ff3d58;color:#12060a;border-color:#ff3d58}
.cf{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(255,255,255,.1)}.cf input{flex:1;padding:10px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:inherit;font:inherit}
.cf button{border:0;border-radius:99px;background:#ff3d58;color:#12060a;font:600 .9rem Prompt,sans-serif;padding:0 16px;cursor:pointer}
@media print{.fb,.cb,.cp{display:none!important}}`;
D.head.append(Object.assign(D.createElement('style'),{textContent:css}));
if(!R&&!home){const pal=['#7a1626','#b3122d','#5a0f1b','#e9dcdd','#9b1c31'];for(let i=0;i<14;i++){const s=D.createElement('span'),w=22+Math.random()*26;s.className='fb';
s.style.cssText=`left:${Math.random()*96}vw;width:${w}px;height:${w*1.3}px;--c:${pal[i%5]};--t:${22+Math.random()*24}s;--dl:-${Math.random()*40}s;--r:${(Math.random()*160-80)|0}deg`;D.body.append(s)}}
const stripped=s=>s.replace(/ครับ|ค่ะ|คะ|นะ|หน่อย|ด้วย|ไหม|มั้ย|[?？!]/g,'').trim();
const user=()=>typeof me=='function'?me():null,fmt=d=>typeof th=='function'?th(d):d;
const ST={pending:'รออนุมัติ',borrowed:'กำลังยืม',returned:'คืนแล้ว',rejected:'ไม่อนุมัติ'};
const N='ผมยังไม่มีข้อมูลเรื่องนี้ในระบบ สอบถามบรรณารักษ์ที่ห้องสมุดโดยตรงจะแม่นที่สุดครับ';
const I=[
[/สวัสดี|หวัดดี|hello|^hi$/i,async()=>'สวัสดีครับ ผมคือผู้ช่วยห้องสมุด ถามเรื่องการยืม การคืน การลงทะเบียน ค้นหาหนังสือ หรือสถานะของคุณได้เลย'],
[/ขอบคุณ|thank/i,async()=>'ยินดีครับ มีอะไรถามได้อีกเสมอ'],
[/สถานะ|ของฉัน|ประวัติ|ค้างคืน|ยืมอะไรอยู่|กำหนดคืน/,async()=>{const m=user();if(!m||m.role!='user')return'เข้าสู่ระบบก่อน ผมจะดูสถานะการยืมของคุณให้ได้ครับ';
const L=(await load('loans',[])).d.filter(l=>l.uid==m.id&&['pending','borrowed'].includes(l.status));
return L.length?'รายการของคุณตอนนี้\n'+L.map(l=>`• ${l.item} (${ST[l.status]}) กำหนดคืน ${fmt(l.due)}`).join('\n'):'ตอนนี้คุณไม่มีรายการที่ค้างอยู่ครับ'}],
[/ค้นหา|หา(หนังสือ|เล่ม)|มี.*(ไหม|มั้ย)|เหลือ|ว่าง/,async q=>{const m=user();if(!m||m.role!='user')return'เข้าสู่ระบบก่อน แล้วผมจะค้นหาหนังสือและบอกจำนวนที่เหลือให้ครับ';
const w=stripped(q).replace(/ค้นหา|หนังสือ|เล่ม|มี|เหลือ|ว่าง|ช่วย|อยาก|ต้องการ|หา|เรื่อง|ของ|กี่/g,' ').split(/\s+/).filter(Boolean);
const [B,L]=(await Promise.all([load('books',[]),load('loans',[])])).map(x=>x.d);
const hit=B.filter(b=>!w.length||w.some(t=>(b.title+' '+(b.type||'')).includes(t))).slice(0,6);
return hit.length?'พบรายการ\n'+hit.map(b=>`• ${b.title} เหลือ ${b.qty-L.filter(l=>l.itemId==b.id&&['pending','borrowed'].includes(l.status)).length} จาก ${b.qty}`).join('\n')+'\nกดขอยืมได้ที่หน้ายืม-คืนครับ':'ไม่พบรายการที่ตรงกัน ลองใช้คำอื่นสั้น ๆ เช่น ชื่อหมวดหรือชื่อเรื่อง'}],
[/ลงทะเบียน|สมัคร|ใช้ครั้งแรก/,async()=>'ที่หน้าเข้าสู่ระบบ เลือกแท็บ ลงทะเบียนครั้งแรก แล้วกรอก\n• รหัสนักศึกษา 11 หลัก\n• ชื่อ นามสกุล ระดับชั้น กลุ่มเรียน\n• แผนกวิชา สาขาวิชา\n• วันเกิดแบบ 12/08/2551 และอีเมล\nจากนั้นเข้าสู่ระบบด้วยรหัสนักศึกษา และใช้วันเกิดเป็นรหัสผ่าน'],
[/รหัสผ่าน|ลืม|เข้า(สู่ระบบ|ไม่ได้)|login/i,async()=>'รหัสผ่านคือวันเดือนปีเกิดแบบ พ.ศ. เช่น 12/08/2551 ถ้ายังเข้าไม่ได้ ให้ติดต่อแอดมินห้องสมุดเพื่อตรวจข้อมูลครับ'],
[/^(?!.*(กี่วัน|กี่เล่ม|ค่าปรับ|เวลา)).*คืน/,async()=>'นำหนังสือมาคืนที่ห้องสมุด แอดมินจะกดรับคืนในระบบ แล้วคุณจะได้อีเมลยืนยันการคืนครับ'],
[/^(?!.*(กี่วัน|กี่เล่ม|ค่าปรับ|เวลา)).*(ยืม|วิธี)/,async()=>'1. เข้าสู่ระบบ แล้วไปหน้ายืม-คืน\n2. เลือกวันที่ต้องการคืน\n3. กดขอยืมที่เล่มที่ต้องการ\n4. รอแอดมินอนุมัติ จะมีอีเมลแจ้ง แล้วมารับเล่มจริงที่ห้องสมุด'],
[/อีเมล|email|แจ้งเตือน|เมล/i,async()=>'ระบบส่งอีเมลเมื่ออนุมัติการยืมและเมื่อรับคืน ตรวจอีเมลที่ลงทะเบียนไว้ รวมถึงกล่องสแปม แก้อีเมลได้ที่หน้าโปรไฟล์ครับ'],
[/โปรไฟล์|แก้ไข(ข้อมูล|ชื่อ)|เปลี่ยน/,async()=>'ไปที่เมนู โปรไฟล์ แก้ข้อมูลแล้วกดบันทึก ถ้าเปลี่ยนวันเกิด รหัสผ่านจะเปลี่ยนตามด้วยครับ'],
[/เวลา|เปิด|ปิด|ที่ตั้ง|ติดต่อ|เบอร์|ค่าปรับ|กี่วัน|กี่เล่ม|กฎ|ระเบียบ/,async()=>N]];
async function answer(q){for(const[r,f]of I)if(r.test(q))return f(q);return'ผมยังไม่เข้าใจคำถามนี้ ลองถามเรื่อง ยืมยังไง คืนยังไง ลงทะเบียน ค้นหาหนังสือ หรือสถานะของฉันได้ครับ'}
window.__answer=answer;
const p=D.createElement('div');p.className='cp';p.innerHTML='<div class="ch"><span>ผู้ช่วยห้องสมุด</span><button aria-label="ปิด">×</button></div><div class="cm"></div><div class="cq"></div><form class="cf"><input placeholder="พิมพ์คำถาม" aria-label="คำถาม"><button>ส่ง</button></form>';
const b=D.createElement('button');b.className='cb';b.setAttribute('aria-label','แชทกับผู้ช่วยห้องสมุด');b.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>';D.body.append(p,b);
const M=p.querySelector('.cm'),inp=p.querySelector('input'),add=(t,c)=>{const e=D.createElement('div');e.className=c;e.textContent=t;M.append(e);M.scrollTop=M.scrollHeight;return e};
['ยืมยังไง','คืนยังไง','ลงทะเบียน','ค้นหาหนังสือ','สถานะของฉัน'].forEach(t=>{const k=D.createElement('button');k.textContent=t;k.onclick=()=>send(t);p.querySelector('.cq').append(k)});
async function send(q){q=q.trim();if(!q)return;add(q,'u');const w=add('...','b');let a;try{a=await answer(q)}catch(e){a='เชื่อมต่อข้อมูลไม่สำเร็จ ลองใหม่อีกครั้งครับ'}setTimeout(()=>{w.textContent=a;M.scrollTop=M.scrollHeight},350)}
p.querySelector('form').onsubmit=e=>{e.preventDefault();send(inp.value);inp.value=''};
const tog=o=>{p.classList.toggle('o',o);if(o){if(!M.children.length)add('สวัสดีครับ ผมช่วยตอบเรื่องการยืม คืน ลงทะเบียน และค้นหาหนังสือได้ ลองกดหัวข้อด้านล่างหรือพิมพ์ถามได้เลย','b');inp.focus()}};
b.onclick=()=>tog(!p.classList.contains('o'));p.querySelector('.ch button').onclick=()=>tog(0);addEventListener('keydown',e=>e.key=='Escape'&&tog(0));
})();
