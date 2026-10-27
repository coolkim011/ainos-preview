const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('mobile-menu');
function closeMenu(){nav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');}
menu.addEventListener('click',()=>{const opening=menu.getAttribute('aria-expanded')!=='true';nav.hidden=!opening;menu.setAttribute('aria-expanded',String(opening));menu.setAttribute('aria-label',opening?'메뉴 닫기':'메뉴 열기');});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){closeMenu();menu.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header')&&!nav.hidden)closeMenu()});
window.matchMedia('(min-width:768px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const filters=[...document.querySelectorAll('[data-filter]')];
const products=[...document.querySelectorAll('.product')];
function filterProducts(type){let count=0;filters.forEach(b=>{const on=b.dataset.filter===type;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});products.forEach(p=>{p.hidden=type!=='all'&&p.dataset.type!==type;p.classList.remove('filtered-in');if(!p.hidden){count++;void p.offsetWidth;p.classList.add('filtered-in');}});const label={all:'전체',cheese:'프레시 치즈',coffee:'커피'}[type];document.getElementById('product-status').textContent=label+' 제품 '+count+'개';}
filters.forEach(b=>b.addEventListener('click',()=>filterProducts(b.dataset.filter)));
document.querySelectorAll('[data-category]').forEach(a=>a.addEventListener('click',()=>filterProducts(a.dataset.category)));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('entrance');observer.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll('.story-intro,.story-wide,.story-bottom>figure,.story-bottom>div,.section-heading,.academy-copy,.business>div,.business>figure').forEach(el=>observer.observe(el));}
