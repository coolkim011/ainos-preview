
(()=>{
 const script=document.currentScript,base=new URL('.',script.src).pathname.replace(/\/$/,''),nativeFetch=window.fetch.bind(window);window.AINOS_BASE=base;window.AINOS_ROUTE=location.pathname.slice(base.length).replace(/\/$/,'')||'/';
 const key='ainos-preview-cart:'+base;let items;try{items=JSON.parse(localStorage.getItem(key)||'[]')}catch{items=[]}if(!Array.isArray(items))items=[];
 const catalog=nativeFetch(base+'/products.json').then(r=>r.json());const response=(data,status=200)=>Promise.resolve(new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}}));
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(items))}catch{}};
 window.fetch=async(input,options={})=>{const raw=typeof input==='string'?input:input.url,url=new URL(raw,location.href);if(!url.pathname.startsWith('/api/'))return nativeFetch(input,options);const route=url.pathname.slice(5),products=await catalog,method=options.method||'GET';
 const current=()=>{const result=items.map(i=>({...products.find(p=>p.id===i.id),quantity:i.quantity})).filter(i=>i.id);return {items:result,count:result.reduce((n,i)=>n+i.quantity,0),total:result.reduce((n,i)=>n+i.price*i.quantity,0)}};
 if(route==='products')return response(products);if(route.startsWith('products/')){const p=products.find(p=>String(p.id)===route.split('/')[1]);return response(p||{error:'상품을 찾을 수 없습니다.'},p?200:404)}
 if(route==='cart'){if(method==='GET')return response(current());let d;try{d=JSON.parse(options.body)}catch{return response({error:'요청을 확인해주세요.'},400)}const p=products.find(p=>p.id===Number(d.productId)),n=Number(d.quantity);if(!p||p.type==='academy'||!Number.isInteger(n)||n<0||n>99)return response({error:'상품 수량을 확인해주세요.'},400);const found=items.find(i=>i.id===p.id),quantity=method==='POST'?(found?.quantity||0)+n:n;if(quantity>99)return response({error:'최대 99개까지 담을 수 있습니다.'},400);items=items.filter(i=>i.id!==p.id);if(quantity)items.push({id:p.id,quantity});save();return response(current())}
 if(route==='auth/me')return response({user:null});if(route==='orders')return response({error:'대표님 검토용 화면입니다. 실제 주문·결제는 진행되지 않습니다.'},400);return response({error:'화면 시연에서 제공하지 않는 기능입니다.'},404);
 };
 const local=(value)=>value.startsWith('/')&&!value.startsWith('//')&&!value.startsWith(base+'/')?base+value:value;
 const fix=root=>root.querySelectorAll('a[href],img[src]').forEach(el=>{const attr=el.tagName==='A'?'href':'src',v=el.getAttribute(attr);if(v)el.setAttribute(attr,local(v))});
 const ready=()=>{fix(document);new MutationObserver(m=>{for(const change of m){for(const node of change.addedNodes)if(node.nodeType===1){if(node.matches('a[href],img[src]')){const attr=node.tagName==='A'?'href':'src';node.setAttribute(attr,local(node.getAttribute(attr)))}fix(node)}}}).observe(document.body,{childList:true,subtree:true})};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
