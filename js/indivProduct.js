/* ===== Utils carrito (igual que antes) ================================= */
const CART_KEY='cart';
const getCart =()=>JSON.parse(localStorage.getItem(CART_KEY)||'[]');
const setCart =arr=>localStorage.setItem(CART_KEY,JSON.stringify(arr));
const addToCart=item=>{
  const cart=getCart();
  const i=cart.findIndex(p=>p.id===item.id);
  if(i>-1) cart[i].qty+=item.qty;
  else cart.push(item);
  setCart(cart);
};

/* ===== Cargar producto según ?id= ===================================== */
document.addEventListener('DOMContentLoaded',()=>{
  /* 1. obtener id */
  const params= new URLSearchParams(window.location.search);
  const id    = params.get('id');
  const prod  = (window.PRODUCTOS||[]).find(p=>p.id===id);

  if(!prod){ document.body.innerHTML='<h2 class="text-center my-5">Producto no encontrado</h2>'; return;}

  /* 2. rellenar DOM básico */
  const section = document.querySelector('.product');
  section.dataset.id   = prod.id;
  section.dataset.name = prod.name;
  section.dataset.price= prod.price;
  section.dataset.img  = prod.mainImg;

  /* título / marca / precio */
  document.querySelector('.details h1').textContent      = prod.name;
  document.querySelector('.details .brand').textContent  = prod.brand;
  document.querySelector('.details .price').textContent  = `S/${prod.price.toFixed(2)}`;

  /* galería */
  const thumbs = document.querySelector('.thumbnails');
  thumbs.innerHTML='';
  prod.imgs.forEach((src,i)=>{
    thumbs.insertAdjacentHTML('beforeend',
      `<img class="thumbnail${i===0?' active':''}" src="${src}" alt="">`);
  });
  document.querySelector('.main-image').src = prod.mainImg;

  /* colores */
  const colorsDiv = document.querySelector('.colors');
  colorsDiv.innerHTML='';
  prod.colors.forEach(c=>{
    colorsDiv.insertAdjacentHTML('beforeend',
      `<div class="color-swatch ${c}"></div>`);
  });

  /* descripción & extra */
  document.querySelector('.description p').textContent = prod.desc;
  document.querySelector('.extra-details p').textContent = prod.extra;

  /* ficha técnica */
  const ulTech = document.querySelector('.tech-specs ul');
  ulTech.innerHTML='';
  prod.tech.forEach(t=>{
    ulTech.insertAdjacentHTML('beforeend',
      `<li><span class="label">${t[0]}</span><span>${t[1]}</span></li>`);
  });

  /* =========== lógica interactiva (galería, qty, colores) =========== */
  let qty=1;
  const qtySpan=document.getElementById('qty');
  const updateQty=()=>qtySpan.textContent=qty;

  /* miniaturas */
  thumbs.addEventListener('click',e=>{
    if(e.target.classList.contains('thumbnail')){
      document.querySelectorAll('.thumbnail').forEach(t=>t.classList.remove('active'));
      e.target.classList.add('active');
      document.querySelector('.main-image').src=e.target.src;
    }
  });

  /* cantidad */
  document.querySelector('.qty-minus').onclick=()=>{ if(qty>1){qty--;updateQty();}};
  document.querySelector('.qty-plus').onclick =()=>{ qty++;updateQty();};

  /* colores */
  colorsDiv.addEventListener('click',e=>{
    if(e.target.classList.contains('color-swatch')){
      document.querySelectorAll('.color-swatch').forEach(c=>c.classList.remove('selected'));
      e.target.classList.add('selected');
    }
  });

  /* construir ítem para carrito */
  const buildItem=()=>({
    id:   prod.id,
    name: prod.name,
    qty,
    price: prod.price,
    img:  prod.mainImg
  });

  /* botones carrito / comprar */
  document.querySelector('.add-cart').onclick=e=>{
    addToCart(buildItem());
    e.target.textContent='Añadido ✓';
    setTimeout(()=>e.target.textContent='Agregar al carrito',1500);
  };
  document.querySelector('.buy').onclick=()=>{
    addToCart(buildItem());
    window.location.href='../html/checkout.html';
  };

  /* productos similares → sim-add botones */
  document.querySelectorAll('.sim-add').forEach(btn=>{
    btn.onclick=()=>{
      addToCart({
        id:btn.dataset.id,
        name:btn.dataset.name,
        qty:1,
        price:parseFloat(btn.dataset.price),
        img:btn.dataset.img
      });
      btn.classList.add('added');
      setTimeout(()=>btn.classList.remove('added'),600);
    };
  });
});
