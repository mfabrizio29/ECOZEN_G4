document.addEventListener("DOMContentLoaded", () => {
  const selectFileLabel = document.querySelector(".custom-file-upload");
  const archivoInput = document.querySelector("#archivo");
  const archivoTextoBox = selectFileLabel.closest(".upload-content").querySelector("div > p").parentElement;
  const form = document.querySelector("form");

  // Abrir selector de archivos
  selectFileLabel.addEventListener("click", (e) => {
    e.preventDefault();
    archivoInput.value = "";
    archivoInput.click();
  });

  // Mostrar información del archivo
  archivoInput.addEventListener("change", () => {
    if (archivoInput.files.length > 0) {
      const file = archivoInput.files[0];
      const fileName = file.name;
      const fileSize = (file.size / 1024 / 1024).toFixed(2);
      const fileType = file.type || "Desconocido";

      archivoTextoBox.innerHTML = `
        <p class="mb-1 fw"><strong>${fileName}</strong></p>
        <small class="text-muted">${fileType} - ${fileSize} MB</small>
      `;

      localStorage.setItem("archivoCargado", "true");
      localStorage.setItem("archivoNombre", fileName);
      guardarFormulario(fileName);
    } else {
      archivoTextoBox.innerHTML = `
        <p class="mb-1 fw">Select a file or drag and drop here</p>
        <small class="text-muted">JPG, PNG or PDF, file size no more than 10MB</small>
      `;
      localStorage.removeItem("archivoCargado");
    }
  });

  // Enviar formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const archivoOk = localStorage.getItem("archivoCargado") === "true";

    if (!archivoOk) {
      alert("Por favor, selecciona un archivo antes de enviar.");
      return;
    }

    mostrarCargaYExito();
  });

  function mostrarCargaYExito() {
    const loaderBox = document.createElement("div");
    loaderBox.className = "file-upload-panel";
    loaderBox.innerHTML = `
      <div class="file-upload-content">
        <h3>Cargando archivo...</h3>
        <div class="loader-message">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    document.body.appendChild(loaderBox);

    setTimeout(() => {
      loaderBox.innerHTML = `
        <div class="file-upload-content">
          <div class="success-box">
            ✅ Archivo cargado exitosamente.
            <br>
            <button id="btn-ok">OK</button>
          </div>
        </div>
      `;

      loaderBox.querySelector("#btn-ok").addEventListener("click", () => {
        localStorage.removeItem("archivoCargado");
        loaderBox.remove();
        form.reset();

        archivoTextoBox.innerHTML = `
          <p class="mb-1 fw">Select a file or drag and drop here</p>
          <small class="text-muted">JPG, PNG or PDF, file size no more than 10MB</small>
        `;

        location.reload();
      });
    }, 3000);
  }

  function guardarFormulario(nombreArchivo) {
    let formularios = JSON.parse(localStorage.getItem("formularios") || "[]");
    formularios.push({
      nombre: nombreArchivo,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem("formularios", JSON.stringify(formularios));
  }

  // Crear botón y contenedor de visualización
  const visualizarBtn = document.createElement("button");
  visualizarBtn.textContent = "Visualizar Formularios Enviados";
  visualizarBtn.type = "button";
  visualizarBtn.id = "visualizar-btn";

  // Estilo visual del botón
  Object.assign(visualizarBtn.style, {
    backgroundColor: "#7E9F5C",
    color: "white",
    fontWeight: "bold",
    border: "none",
    padding: "12px 24px",
    borderRadius: "0",
    cursor: "pointer",
    transition: "color 0.3s ease",
    display: "block",
    margin: "30px auto 10px auto",
    fontSize: "16px"
  });

  // Hover efecto texto negro
  visualizarBtn.addEventListener("mouseenter", () => {
    visualizarBtn.style.color = "black";
  });
  visualizarBtn.addEventListener("mouseleave", () => {
    visualizarBtn.style.color = "white";
  });

  const visualizarContainer = document.createElement("div");
  visualizarContainer.style.display = "none";
  visualizarContainer.style.margin = "10px auto";
  visualizarContainer.style.maxWidth = "600px";
  visualizarContainer.style.textAlign = "left";

  let visible = false;

  visualizarBtn.addEventListener("click", () => {
    visible = !visible;
    visualizarContainer.style.display = visible ? "block" : "none";
    if (visible) mostrarListaFormularios();
  });

  function mostrarListaFormularios() {
    const formularios = JSON.parse(localStorage.getItem("formularios") || "[]");

    if (formularios.length === 0) {
      visualizarContainer.innerHTML = "<p style='text-align:center;'>No hay formularios enviados.</p>";
      return;
    }

    const lista = document.createElement("ul");
    lista.style.listStyle = "none";
    lista.style.padding = "0";

    formularios.forEach((formulario, index) => {
      const item = document.createElement("li");
      item.style.marginBottom = "10px";
      item.style.borderBottom = "1px solid #ccc";
      item.style.paddingBottom = "8px";

      item.innerHTML = `
        <strong>${formulario.nombre}</strong><br>
        <small>${formulario.fecha}</small>
        <button style="
          margin-left: 10px;
          padding: 2px 6px;
          background-color: red;
          color: white;
          border: none;
          font-size: 0.8em;
          cursor: pointer;
        ">Eliminar</button>
      `;

      item.querySelector("button").addEventListener("click", () => {
        eliminarFormulario(index);
        mostrarListaFormularios();
      });

      lista.appendChild(item);
    });

    visualizarContainer.innerHTML = "";
    visualizarContainer.appendChild(lista);
  }

  function eliminarFormulario(index) {
    let formularios = JSON.parse(localStorage.getItem("formularios") || "[]");
    formularios.splice(index, 1);
    localStorage.setItem("formularios", JSON.stringify(formularios));
  }

  // Insertar el botón y la lista justo después del formulario
  form.parentNode.insertBefore(visualizarBtn, form.nextSibling);
  form.parentNode.insertBefore(visualizarContainer, visualizarBtn.nextSibling);
});
