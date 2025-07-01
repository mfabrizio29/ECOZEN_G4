const productos = [
  { img: "../img/ayuda/recomendado2.png", titulo: "Producto 1", descripcion: "Descripción del producto 1" },
  { img: "../img/ayuda/recomendado3.png", titulo: "Producto 2", descripcion: "Descripción del producto 2" },
  { img: "../img/ayuda/recomendado4.png", titulo: "Producto 3", descripcion: "Descripción del producto 3" },
  { img: "../img/ayuda/recomendado1.png", titulo: "Producto 4", descripcion: "Descripción del producto 4" },
  { img: "../img/ayuda/recomendado4.png", titulo: "Producto 5", descripcion: "Descripción del producto 5" }
];

const galeria = document.getElementById("galeria");
let indiceActual = 0;

function crearTarjeta(producto, index) {
  const div = document.createElement("div");
  div.className = "tarjeta-producto card text-center";
  div.innerHTML = `
    <img src="${producto.img}" class="card-img-top" alt="${producto.titulo}">
    <div class="card-body">
      <h5 class="card-title">${producto.titulo}</h5>
      <p class="card-text">${producto.descripcion}</p>
      <button class="btn btn-success mb-2">Ir al producto</button><br>
      <a href="#" class="text-decoration-none">Ver productos similares</a>
    </div>
  `;
  return div;
}

function renderTarjetas() {
  galeria.innerHTML = "";
  
  productos.forEach((producto, index) => {
    const tarjeta = crearTarjeta(producto, index);
    galeria.appendChild(tarjeta);
  });
  
  actualizarVista();
  crearIndicadores();
}

function actualizarVista() {
  const tarjetas = document.querySelectorAll(".tarjeta-producto");
  
  tarjetas.forEach((tarjeta, index) => {
    // Remover todas las clases de posición
    tarjeta.classList.remove("activa", "izquierda", "derecha");
    
    if (index === indiceActual) {
      tarjeta.classList.add("activa");
    } else if (index === (indiceActual - 1 + productos.length) % productos.length) {
      tarjeta.classList.add("izquierda");
    } else if (index === (indiceActual + 1) % productos.length) {
      tarjeta.classList.add("derecha");
    }
  });
  
  actualizarContadorPagina();
  actualizarIndicadores();
}

function actualizarContadorPagina() {
  const contador = document.getElementById("contador-pagina");
  contador.textContent = `Página ${indiceActual + 1} de ${productos.length}`;
}

function crearIndicadores() {
  const indicadoresContainer = document.getElementById("indicadores");
  indicadoresContainer.innerHTML = "";
  
  productos.forEach((_, index) => {
    const indicador = document.createElement("div");
    indicador.className = "indicador";
    indicador.addEventListener("click", () => irAIndice(index));
    indicadoresContainer.appendChild(indicador);
  });
}

function actualizarIndicadores() {
  const indicadores = document.querySelectorAll(".indicador");
  indicadores.forEach((indicador, index) => {
    indicador.classList.toggle("activo", index === indiceActual);
  });
}

function moverIzquierda() {
  indiceActual = (indiceActual - 1 + productos.length) % productos.length;
  actualizarVista();
}

function moverDerecha() {
  indiceActual = (indiceActual + 1) % productos.length;
  actualizarVista();
}

function irAIndice(index) {
  indiceActual = index;
  actualizarVista();
}

// Navegación con teclado (opcional)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moverIzquierda();
  } else if (e.key === "ArrowRight") {
    moverDerecha();
  }
});

// Inicializar cuando se carga la página
renderTarjetas();