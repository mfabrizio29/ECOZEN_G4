document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-reclamo");
    const inputs = form.querySelectorAll("input, select, textarea");
    const archivoInput = document.getElementById("archivo");
    const btnEnviar = document.getElementById("btnEnviar");
  
    const mostrarError = (campo, mensajeCustom) => {
      campo.classList.add("is-invalid");
  
      if (!campo.nextElementSibling || !campo.nextElementSibling.classList.contains("mensaje-error")) {
        const mensaje = document.createElement("div");
        mensaje.className = "mensaje-error text-danger mt-1";
        mensaje.textContent = mensajeCustom || "Este campo es obligatorio.";
        campo.parentNode.appendChild(mensaje);
      }
    };
  
    const limpiarErrores = () => {
      form.querySelectorAll(".is-invalid").forEach((campo) => campo.classList.remove("is-invalid"));
      form.querySelectorAll(".mensaje-error").forEach((m) => m.remove());
    };
  
    document.querySelector(".custom-file-upload").addEventListener("click", function (e) {
      e.preventDefault();
      archivoInput.click();
    });
  
    archivoInput.addEventListener("change", function () {
      const archivo = archivoInput.files[0];
      const info = archivoInput.closest(".upload-content").querySelector("div");
  
      if (archivo) {
        const fileName = archivo.name;
        const fileSize = (archivo.size / 1024 / 1024).toFixed(2);
        const fileType = archivo.type || "Desconocido";
  
        info.innerHTML = `
          <p class="mb-1"><strong>${fileName}</strong></p>
          <small class="text-muted">${fileType} - ${fileSize} MB</small>
        `;
      } else {
        info.innerHTML = `
          <p class="mb-1">Select a file or drag and drop here</p>
          <small class="text-muted">JPG, PNG or PDF, file size no more than 10MB</small>
        `;
      }
    });
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      limpiarErrores();
  
      let formularioValido = true;
  
      inputs.forEach((input) => {
        const valor = input.value.trim();
        const tipo = input.type;
  
        if (input.tagName === "SELECT" && (valor === "" || input.selectedIndex === 0)) {
          mostrarError(input);
          formularioValido = false;
        } else if (
          (tipo === "text" || tipo === "tel" || tipo === "textarea" || input.tagName === "TEXTAREA") &&
          valor === ""
        ) {
          mostrarError(input);
          formularioValido = false;
        }
  
        if (tipo === "email" && !valor.includes("@")) {
          mostrarError(input, "Ingrese un email válido.");
          formularioValido = false;
        }
  
        if (tipo === "tel" && !/^\d{9}$/.test(valor)) {
          mostrarError(input, "Ingrese un número válido de 9 dígitos.");
          formularioValido = false;
        }
      });
  
      const archivo = archivoInput.files[0];
      if (!archivo) {
        mostrarError(archivoInput, "Debe seleccionar un archivo.");
        formularioValido = false;
      } else {
        const extPermitidas = ["jpg", "jpeg", "png", "pdf"];
        const extension = archivo.name.split(".").pop().toLowerCase();
        const esValida = extPermitidas.includes(extension);
        const esPesoValido = archivo.size <= 10 * 1024 * 1024;
  
        if (!esValida || !esPesoValido) {
          mostrarError(archivoInput, "Archivo inválido. Solo JPG, PNG o PDF (máx 10MB).");
          formularioValido = false;
        }
      }
  
      if (formularioValido) {
        const info = archivoInput.closest(".upload-content").querySelector("div");
        info.innerHTML = `
          <p class="mb-1">Select a file or drag and drop here</p>
          <small class="text-muted">JPG, PNG or PDF, file size no more than 10MB</small>
        `;
  
        form.reset();
        archivoInput.value = "";
      } else {
        window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
      }
    });
  });
  