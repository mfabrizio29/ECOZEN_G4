document.addEventListener("DOMContentLoaded", () => {
  const userMenus = document.querySelectorAll("#userMenu");
  const modal = document.getElementById("authModal");
  const closeBtn = document.querySelector(".close-auth");
  const authForm = document.getElementById("authForm");
  const authTitle = document.getElementById("authTitle");

  // Revisa si el usuario ya inició sesión antes
  let isLoggedIn = localStorage.getItem("ecozenUserLoggedIn") === "true";

  updateUserMenus();

  userMenus.forEach(menu => {
    menu.addEventListener("change", () => {
      const selected = menu.value;

      if (!isLoggedIn && (selected === "login" || selected === "register")) {
        authTitle.textContent = selected === "login" ? "Iniciar Sesión" : "Registrarse";
        modal.style.display = "block";
      } else if (isLoggedIn && selected === "logout") {
        localStorage.removeItem("ecozenUserLoggedIn");
        isLoggedIn = false;
        alert("Sesión cerrada.");
        updateUserMenus();
      }
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  authForm.onsubmit = e => {
    e.preventDefault();

    // Aquí puedes obtener los valores
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    // Simula validación
    if (user.length > 0 && pass.length > 0) {
      localStorage.setItem("ecozenUserLoggedIn", "true");
      isLoggedIn = true;
      modal.style.display = "none";
      updateUserMenus();
    } else {
      alert("Usuario o contraseña inválidos");
    }
  };

  function updateUserMenus() {
    userMenus.forEach(menu => {
      menu.innerHTML = "";
      if (isLoggedIn) {
        menu.innerHTML += `<option value="profile">Perfil</option>`;
        menu.innerHTML += `<option value="logout">Salir</option>`;
      } else {
        menu.innerHTML += `<option value="login">Iniciar sesión</option>`;
        menu.innerHTML += `<option value="register">Registrarse</option>`;
      }
    });
  }
});
