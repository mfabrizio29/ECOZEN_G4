/* ===== Utils ===== */
const qs = s=>document.querySelector(s);
const money = n => (Math.round(n*100)/100)
                   .toLocaleString('es-PE',{minimumFractionDigits:2});
const longDate = iso =>
  new Date(iso).toLocaleDateString('es-PE',{year:'numeric',month:'long',day:'numeric'});

/* ===== Render ===== */
function renderOrders(){
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
                    .sort((a,b)=> new Date(b.date)-new Date(a.date)); // más reciente arriba
  const tbody = qs('#orders-body');
  const empty = qs('#empty-orders');

  tbody.innerHTML='';
  if(orders.length===0){ empty.classList.remove('d-none'); return; }
  empty.classList.add('d-none');

  orders.forEach(o=>{
    tbody.insertAdjacentHTML('beforeend',`
      <tr>
        <td>#${o.id}</td>
        <td>${longDate(o.date)}</td>
        <td>${o.status}</td>
        <td>S/${money(o.total)}</td>
      </tr>`);
  });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', renderOrders);