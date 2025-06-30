/* ===== Utils ===== */
const qs  = s=>document.querySelector(s);
const qsa = s=>[...document.querySelectorAll(s)];
const money = n => (Math.round(n*100)/100).toLocaleString('es-PE',{minimumFractionDigits:2});

/* ===== Carrito en localStorage ===== */
const CART_KEY='cart';
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)||'[]');
const setCart = arr => localStorage.setItem(CART_KEY,JSON.stringify(arr));

/* Puedes llamarla desde tu futura página de productos */
window.addToCart = ({id,name,qty,price,img=''})=>{
  const cart=getCart();
  const idx=cart.findIndex(p=>p.id===id);
  if(idx>-1) cart[idx].qty+=qty;
  else cart.push({id,name,qty,price,img});
  setCart(cart);
};

/* ===== Paso 1: render ===== */
function renderCart(){
  const cart=getCart();
  const tbody=qs('#cart-body');
  const empty=qs('#empty-msg');
  const btn=qs('#to-step-1');
  tbody.innerHTML='';
  if(cart.length===0){
    empty.classList.remove('d-none');
    btn.disabled=true; return;
  }
  empty.classList.add('d-none');
  btn.disabled=false;

  cart.forEach(p=>{
    tbody.insertAdjacentHTML('beforeend',`
      <tr>
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>S/${money(p.price)}</td>
        <td>S/${money(p.qty*p.price)}</td>
      </tr>`);
  });
}

/* ===== Paso 2: resumen dinámico ===== */
let couponValue=0, shippingCost=0;
function renderSummary(){
  const cart=getCart();
  const list=qs('#summary-products');
  list.innerHTML='';
  cart.forEach(p=>{
    list.insertAdjacentHTML('beforeend',`
      <li>
        <span>${p.name}</span>
        <span>S/${money(p.qty*p.price)}</span>
      </li>`);
  });
  const subtotal=cart.reduce((s,p)=>s+p.qty*p.price,0);
  qs('#summary-subtotal').textContent=`S/${money(subtotal)}`;
  qs('#summary-discount').textContent=`-S/${money(couponValue)}`;
  qs('#summary-shipping').textContent= shippingCost===0 ? 'gratis' : `S/${money(shippingCost)}`;
  qs('#summary-total').textContent=`S/${money(subtotal-couponValue+shippingCost)}`;
}

/* ===== Wizard logic ===== */
let current=0;
const steps=qsa('.step-content');
const nav=qsa('.step-indicator');
const enableNav=i=>nav[i].classList.add('done');
const showStep=i=>{
  steps[current].classList.remove('active');
  nav[current].classList.remove('active');
  steps[i].classList.add('active');
  nav[i].classList.add('active');
  current=i;
};

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded',()=>{
  renderCart();

  /* Navegación manual en la barra */
  nav.forEach((el,i)=>el.addEventListener('click',()=>{ if(i<=current||el.classList.contains('done')) showStep(i);}));

  /* Paso 0→1 */
  qs('#to-step-1').addEventListener('click',()=>{ enableNav(0); renderSummary(); showStep(1);});
  qs('#back-to-0').addEventListener('click',()=>showStep(0));

  /* Cupón (demo) */
  qs('#apply-coupon').addEventListener('click',()=>{
    const code=qs('#coupon-input').value.trim().toUpperCase();
    couponValue = code==='DESCUENTO25' ? 25 : 0;
    renderSummary();
  });

  /* Paso 1→2 (pago) */
  qs('#payment-form').addEventListener('submit',e=>{
    e.preventDefault();
    const form=e.target;
    if(!form.checkValidity()){ form.classList.add('was-validated'); return; }

    /* Datos para el paso 3 */
    const cart=getCart();
    const total=cart.reduce((s,p)=>s+p.qty*p.price,0)-couponValue+shippingCost;
    qs('#order-date').textContent=new Date().toLocaleDateString('es-PE',{day:'numeric',month:'long',year:'numeric'});
    qs('#order-total').textContent=money(total);
    qs('#order-code').textContent='#'+Math.random().toString(36).substring(2,8).toUpperCase();

    /* mini‑imágenes */
    const imgs=qs('#order-images');
    imgs.innerHTML='';
    cart.slice(0,2).forEach(p=>{
      imgs.insertAdjacentHTML('beforeend',`<img src="${p.img||'../img/productos/placeholder.png'}" width="70" alt="">`);
    });

    enableNav(1); showStep(2);
    // localStorage.removeItem(CART_KEY); // <- descomenta si deseas vaciar carrito al finalizar
  });

  /* Paso 2→1 */
  qs('#back-to-1').addEventListener('click',()=>showStep(1));
});
