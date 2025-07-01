const productos = [
    {
        id: 1,
        nombre: "Gardena Manguera espiral para terrazas",
        precio: 141.60,
        imagen: "../img/productos/producto1.png",
        enlace: "producto1.html",
        rating: "★★★★☆"
    },
    {
        id: 2,
        nombre: "Rainbird Programador de riego ESP-RZXe",
        precio: 480.00,
        imagen: "../img/productos/producto2.png",
        enlace: "producto2.html",
        rating: "★★★★★"
    },
    {
        id: 3,
        nombre: "COMPO BIO Abono orgánico Universal",
        precio: 24.90,
        imagen: "../img/productos/producto3.png",
        enlace: "producto3.html",
        rating: "★★★★☆"
    },
    {
        id: 4,
        nombre: "Temporizador de riego automático para grifo",
        precio: 295.00,
        imagen: "../img/productos/producto4.png",
        enlace: "producto4.html",
        rating: "★★★★☆"
    },
    {
        id: 5,
        nombre: "Click & Grow Kit de jardinería para interiores",
        precio: 358.80,
        imagen: "../img/productos/producto5.png",
        enlace: "indivProduct.html",
        rating: "★★★★☆"
    },
    {
        id: 6,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto6.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 7,
        nombre: "Gardena Manguera espiral para terrazas",
        precio: 141.60,
        imagen: "../img/productos/producto7.png",
        enlace: "producto7.html",
        rating: "★★★★☆"
    },
    {
        id: 8,
        nombre: "Rainbird Programador de riego ESP-RZXe",
        precio: 480.00,
        imagen: "../img/productos/producto8.png",
        enlace: "producto2.html",
        rating: "★★★★★"
    },
    {
        id: 9,
        nombre: "COMPO BIO Abono orgánico Universal",
        precio: 24.90,
        imagen: "../img/productos/producto9.png",
        enlace: "producto3.html",
        rating: "★★★★☆"
    },
    {
        id: 10,
        nombre: "Temporizador de riego automático para grifo",
        precio: 295.00,
        imagen: "../img/productos/producto10.png",
        enlace: "producto4.html",
        rating: "★★★★☆"
    },
    {
        id: 11,
        nombre: "Click & Grow Kit de jardinería para interiores",
        precio: 358.80,
        imagen: "../img/productos/producto11.png",
        enlace: "producto5.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto12.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto13.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto14.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto15.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto16.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto17.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto18.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto19.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto20.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto21.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto22.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },
    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto23.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    },

    {
        id: 12,
        nombre: "Gardena Cortacésped helicoidal 330",
        precio: 533.90,
        imagen: "../img/productos/producto24.png",
        enlace: "producto6.html",
        rating: "★★★★☆"
    }
];

const productosPorPagina = 12;
let paginaActual = 1;

function renderizarProductos() {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosAMostrar = productos.slice(inicio, fin);

    const contenedor = document.querySelector("main.productos");
    contenedor.innerHTML = "";

    productosAMostrar.forEach(producto => {
        contenedor.innerHTML += `
      <div class="producto">
        <a href="${producto.enlace}">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
        </a>
        <p>${producto.nombre}</p>
        <p class="precio">S/ ${producto.precio.toFixed(2)}</p>
        <div class="acciones">
          <span>${producto.rating}</span>
          <button onclick="agregarAlCarrito(${producto.id})">
            <img src="../img/productos/carrito.svg" alt="🛒">
          </button>
        </div>
      </div>
    `;
    });

    // Actualizar info de paginación
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    document.querySelector(".paginacion-info").textContent = `Página ${paginaActual} de ${totalPaginas}`;

    // Habilitar/deshabilitar botones
    document.getElementById("btnAnterior").disabled = paginaActual === 1;
    document.getElementById("btnSiguiente").disabled = paginaActual === totalPaginas;
}

// Eventos de los botones
document.getElementById("btnAnterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        renderizarProductos();
    }
});

document.getElementById("btnSiguiente").addEventListener("click", () => {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarProductos();
    }
});

// Llamar al cargar
window.addEventListener("DOMContentLoaded", renderizarProductos);

// Simula agregar al carrito
function agregarAlCarrito(id) {
    alert("Producto " + id + " agregado al carrito");
}
