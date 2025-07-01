document.addEventListener('DOMContentLoaded', function () {
  const btnOpenLogin = document.getElementById('openLogin');
  const btnOpenRegister = document.getElementById('openRegister');
  const modalLogin = document.getElementById('loginModal');
  const modalRegister = document.getElementById('registerModal');
  const closeBtns = document.querySelectorAll('.close-btn');
  const logoutBtn = document.getElementById('logoutBtn');

  const headerMenu = document.getElementById('userMenu');

  // Funciones para abrir y cerrar
  function openModal(modal) {
    modal.classList.remove('d-none');
  }

  function closeModal(modal) {
    modal.classList.add('d-none');
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(modalLogin);
      closeModal(modalRegister);
    });
  });

  // Abrir modales
  if (btnOpenLogin) {
    btnOpenLogin.addEventListener('click', () => openModal(modalLogin));
  }

  if (btnOpenRegister) {
    btnOpenRegister.addEventListener('click', () => openModal(modalRegister));
  }

  // Login simulado
  const loginForm = document.getElementById('formLogin');
  loginForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (email && password) {
      localStorage.setItem('ecozen-user', email);
      closeModal(modalLogin);
      updateHeader(true);
    }
  });

  // Registro simulado
  const registerForm = document.getElementById('formRegister');
  registerForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const pass = this.querySelector('input[name="password"]').value;
    const confirm = this.querySelector('input[name="confirm"]').value;

    if (pass !== confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const email = this.querySelector('input[name="email"]').value;
    localStorage.setItem('ecozen-user', email);
    closeModal(modalRegister);
    updateHeader(true);
  });

  // Cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('ecozen-user');
      updateHeader(false);
    });
  }

  // Cambia el header dinámicamente
  function updateHeader(loggedIn) {
    if (!headerMenu) return;

    if (loggedIn) {
      headerMenu.innerHTML = `
        <img src="../img/fooder-header/usuario.png" class="icon-img" alt="Perfil" />
        <select class="delicate-select">
          <option>Perfil</option>
          <option id="logoutBtn">Salir</option>
        </select>
        <div class="dropdown-arrow"></div>
      `;

      // Volver a asignar evento al nuevo logoutBtn
      document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.removeItem('ecozen-user');
        updateHeader(false);
      });

    } else {
      headerMenu.innerHTML = `
        <img src="../img/fooder-header/usuario.png" class="icon-img" alt="Usuario" />
        <select class="delicate-select">
          <option id="openRegister">Registrarse</option>
          <option id="openLogin">Iniciar Sesión</option>
        </select>
        <div class="dropdown-arrow"></div>
      `;

      document.getElementById('openRegister')?.addEventListener('click', () => openModal(modalRegister));
      document.getElementById('openLogin')?.addEventListener('click', () => openModal(modalLogin));
    }
  }

  // Cargar estado actual del login
  const savedUser = localStorage.getItem('ecozen-user');
  updateHeader(!!savedUser);
});
