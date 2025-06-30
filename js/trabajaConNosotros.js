document.addEventListener("DOMContentLoaded", () => {
    const selectFileLabel = document.querySelector(".custom-file-upload");
    const archivoInput = document.querySelector("#archivo");
    const archivoTextoBox = selectFileLabel.closest(".upload-content").querySelector("div > p").parentElement;
    const form = document.querySelector("form");
  
    // Mostrar panel de carga al seleccionar archivo
    selectFileLabel.addEventListener("click", (e) => {
      e.preventDefault();
      archivoInput.value = "";
      archivoInput.click();
    });
  
    archivoInput.addEventListener("change", () => {
      if (archivoInput.files.length > 0) {
        const file = archivoInput.files[0];
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        const fileType = file.type || "Desconocido";
  
        // ✅ Actualizar el texto del costado
        archivoTextoBox.innerHTML = `
          <p class="mb-1 fw"><strong>${fileName}</strong></p>
          <small class="text-muted">${fileType} - ${fileSize} MB</small>
        `;
  
        localStorage.setItem("archivoCargado", "true");
      } else {
        // Si se cancela la selección, restaurar el texto original
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
  
          // Restaurar el texto inicial
          archivoTextoBox.innerHTML = `
            <p class="mb-1 fw">Select a file or drag and drop here</p>
            <small class="text-muted">JPG, PNG or PDF, file size no more than 10MB</small>
          `;
  
          location.reload();
        });
      }, 5000);
    }
  });
  