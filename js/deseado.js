/* ---------- utilidades comunes ---------- */
const qs  = s => document.querySelector(s);
const money = n => (Math.round(n*100)/100)
                    .toLocaleString('es-PE',{minimumFractionDigits:2});

/* ---------- wishlist en localStorage ---------- */
const WL_KEY  = 'wishlist';
const getWL   = () => JSON.parse(localStorage.getItem(WL_KEY) || '[]');
const setWL   = arr => localStorage.setItem(WL_KEY, JSON.stringify(arr));

/* ---------- carrito ya existe ---------- */
const CART_KEY='cart';
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)||'[]');
const setCart = a   => localStorage.setItem(CART_KEY,JSON.stringify(a));
window.addToCart = ({id,name,qty,price,img=''})=>{
  const c = getCart();
  const i = c.findIndex(p=>p.id===id);
  i>-1 ? c[i].qty+=qty : c.push({id,name,qty,price,img});
  setCart(c);
};

/* ---------- dibujar tabla ---------- */
function renderWL(){
  const wl    = getWL();
  const tbody = qs('#wish-body');
  const empty = qs('#wish-empty');
  const totalLbl = qs('#wish-total');

  tbody.innerHTML = '';
  if(wl.length===0){ empty.classList.remove('d-none'); totalLbl.textContent='S/0.00'; return; }
  empty.classList.add('d-none');

  let total = 0;
  wl.forEach(p=>{
    const sub = p.qty * p.price;
    total    += sub;

    tbody.insertAdjacentHTML('beforeend', `
      <tr data-id="${p.id}">
        <td>${p.name}</td>

        <td>
          <div class="d-inline-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary qty-minus">−</button>
            <span class="qty">${p.qty}</span>
            <button class="btn btn-sm btn-outline-secondary qty-plus">+</button>
          </div>
        </td>

        <td>S/${money(p.price)}</td>
        <td class="subtotal">S/${money(sub)}</td>

        <td class="text-end">
          <button class="btn btn-sm btn-dark add-cart">Agregar</button>
          <button class="btn btn-sm btn-link text-danger remove">✕</button>
        </td>
      </tr>
    `);
  });

  totalLbl.textContent = `S/${money(total)}`;
}

/* ---------- listeners ---------- */
document.addEventListener('DOMContentLoaded', ()=>{

  renderWL();

  /* delegación sobre la tabla */
  qs('#wish-body').addEventListener('click', e=>{
    const row = e.target.closest('tr');
    if(!row) return;
    const id  = row.dataset.id;
    const wl  = getWL();
    const idx = wl.findIndex(p=>p.id===id);
    if(idx===-1) return;

    /* sumar / restar cantidad */
    if(e.target.classList.contains('qty-plus')){
      wl[idx].qty++; setWL(wl); renderWL();
    }
    if(e.target.classList.contains('qty-minus')){
      if(wl[idx].qty>1){ wl[idx].qty--; setWL(wl); renderWL();}
    }

    /* quitar de la wishlist */
    if(e.target.classList.contains('remove')){
      wl.splice(idx,1); setWL(wl); renderWL();
    }

    /* agregar al carrito */
    if(e.target.classList.contains('add-cart')){
      addToCart(wl[idx]);               // usa la util que ya tienes
      wl.splice(idx,1); setWL(wl);      // lo quitamos de la lista
      renderWL();
    }
  });
});
