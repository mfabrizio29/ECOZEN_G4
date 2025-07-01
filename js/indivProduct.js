/* ---------- utilidades carrito ---------- */
const CART_KEY = 'cart';
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const setCart = a   => localStorage.setItem(CART_KEY, JSON.stringify(a));
const addToCart = item => {
  const c = getCart();
  const i = c.findIndex(p => p.id === item.id);
  i > -1 ? c[i].qty += item.qty : c.push(item);
  setCart(c);
};

/* ---------- lógica página producto ---------- */
document.addEventListener('DOMContentLoaded', () => {
  /* refs rápidas */
  const section   = document.getElementById('producto');
  const mainImg   = section.querySelector('.main-image');
  const thumbs    = section.querySelectorAll('.thumbnails img');
  const qtySpan   = section.querySelector('.quantity span');
  const btnAdd    = section.querySelector('.add-cart');
  const btnBuy    = section.querySelector('.buy');

  /* cantidad */
  let qty = 1;
  const updateQty = () => qtySpan.textContent = qty;
  section.querySelector('.quantity button:first-child')
          .addEventListener('click', () => { if (qty > 1) { qty--; updateQty(); }});
  section.querySelector('.quantity button:last-child')
          .addEventListener('click', () => { qty++; updateQty(); });

  /* miniaturas */
  thumbs.forEach(t => t.addEventListener('click', () => {
    thumbs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    mainImg.src = t.src;
  }));

  /* construir objeto‑producto para el carrito */
  const buildItem = () => ({
    id   : section.dataset.id,
    name : section.dataset.name,
    qty  : qty,
    price: parseFloat(section.dataset.price),
    img  : section.dataset.img
  });

  /* agregar al carrito */
  btnAdd.addEventListener('click', e => {
    addToCart(buildItem());
    e.target.textContent = 'Añadido ✓';
    setTimeout(() => e.target.textContent = 'Agregar al carrito', 1200);
  });

  /* comprar = agregar + ir al carrito */
  btnBuy.addEventListener('click', () => {
    addToCart(buildItem());
    location.href = '../html/carrito.html';
  });
});
