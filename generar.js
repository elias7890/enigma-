const c=require('crypto');
const H=s=>c.createHash('sha256').update(s,'utf8').digest('hex');
const h=(id,a)=>H('cerrojo-v1:'+id+':'+a);
const rows=['RELOJ','SILENCIO','MAPA','HUEVO','PEINE'];
const out={};
rows.forEach((r,i)=>out['c'+i]=h('c'+i,r));
out.s2=h('s2','86731'); out.s3=h('s3','52143'); out.s4=h('s4','JOLER'); out.s5=h('s5','2178');
// caesar shift 5
const plain='ESCRIBE AL REVES LA PRIMERA PALABRA DEL CRUCIGRAMA';
out.cipher=plain.replace(/[A-Z]/g,ch=>String.fromCharCode((ch.charCodeAt(0)-65+5)%26+65));
// final message
const key=[...rows,'86731','52143','JOLER','2178'].join('|');
const msg=JSON.stringify({a:'Lo lograste.',b:'Detrás de todas estas cerraduras había una sola cosa, y es tuya:',c:'GRAND THEFT AUTO VI',d:'Feliz regalo.'});
const mb=Buffer.from(msg,'utf8');
let ks=Buffer.alloc(0);let i=0;
while(ks.length<mb.length){ks=Buffer.concat([ks,c.createHash('sha256').update(key+'#'+i).digest()]);i++;}
const ct=Buffer.from(mb.map((b,j)=>b^ks[j]));
out.final=ct.toString('base64');
console.log(JSON.stringify(out,null,1));
