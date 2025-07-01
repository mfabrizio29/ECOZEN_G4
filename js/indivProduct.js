/* ====== util carrito (igual que antes) ===================== */
const CART_KEY='cart';
const getCart=()=>JSON.parse(localStorage.getItem(CART_KEY)||'[]');
const setCart=a=>localStorage.setItem(CART_KEY,JSON.stringify(a));
const addToCart=item=>{
  const c=getCart(); const i=c.findIndex(p=>p.id===item.id);
  if(i>-1) c[i].qty+=item.qty; else c.push(item); setCart(c);
};

/* ====== carga dinámica ===================================== */
document.addEventListener('DOMContentLoaded',()=>{
  /* 1. id de la URL */
  const id = new URLSearchParams(location.search).get('id');
  const p  = (window.PRODUCTOS||[]).find(x=>x.id===id);
  if(!p){ document.body.innerHTML='<h2 class="text-center my-5">Producto no encontrado</h2>'; return;}

  /* 2. Rellenar datos base */
  const section=document.querySelector('.product');
  section.dataset.id = p.id;          // para carrito
  section.dataset.name=p.name;
  section.dataset.price=p.price;
  section.dataset.img=p.mainImg;

  document.querySelector('.details h1').textContent   = p.name;
  document.querySelector('.brand').textContent        = p.brand;
  document.querySelector('.price').textContent        = `S/${p.price.toFixed(2)}`;

  /* 3. Galería */
  const thumbs=document.querySelector('.thumbnails');
  thumbs.innerHTML='';
  p.imgs.forEach((src,i)=>{
    thumbs.insertAdjacentHTML('beforeend',
      `<img class="thumbnail${i===0?' active':''}" src="${src}" alt="">`);
  });
  document.querySelector('.main-image').src = p.mainImg;

  /* 4. Colores */
  const colorsDiv=document.querySelector('.colors');
  colorsDiv.innerHTML='';
  p.colors.forEach(c=>{
    colorsDiv.insertAdjacentHTML('beforeend', `<div class="color-swatch ${c}"></div>`);
  });

  /* 5. Descripción & extra */
  document.querySelector('.description p').textContent   = p.desc;
  document.querySelector('.extra-details p').textContent = p.extra;

  /* 6. Ficha técnica */
  const ul=document.querySelector('.tech-specs ul');
  ul.innerHTML='';
  p.tech.forEach(t=>{
    ul.insertAdjacentHTML('beforeend', `<li><span class="label">${t[0]}</span><span>${t[1]}</span></li>`);
  });

  /* ======== Interacciones ======== */
  /* Galería miniaturas */
  thumbs.addEventListener('click',e=>{
    if(e.target.classList.contains('thumbnail')){
      document.querySelectorAll('.thumbnail').forEach(t=>t.classList.remove('active'));
      e.target.classList.add('active');
      document.querySelector('.main-image').src=e.target.src;
    }
  });

  /* Cantidad */
  /* Cantidad */
let qty = 1;
const qtySpan = document.querySelector('.quantity span');

/* obtenemos los DOS botones de la cantidad */
const [minusBtn, plusBtn] = document.querySelectorAll('.quantity button');

const updateQty = () => qtySpan.textContent = qty;

minusBtn.addEventListener('click', () => {
  if (qty > 1) { qty--; updateQty(); }
});
plusBtn.addEventListener('click', () => {
  qty++; updateQty();
});


  /* Colores */
  colorsDiv.addEventListener('click',e=>{
    if(e.target.classList.contains('color-swatch')){
      document.querySelectorAll('.color-swatch').forEach(c=>c.classList.remove('selected'));
      e.target.classList.add('selected');
    }
  });

  /* Carrito / Comprar */
  const build=()=>({id:p.id,name:p.name,qty,price:p.price,img:p.mainImg});
  document.querySelector('.add-cart').onclick=e=>{
    addToCart(build());
    e.target.textContent='Añadido ✓'; setTimeout(()=>e.target.textContent='Agregar al carrito',1300);
  };
  document.querySelector('.buy').onclick=()=>{
    addToCart(build());
    location.href='../html/checkout.html';
  };
});
