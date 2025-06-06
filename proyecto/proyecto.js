document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const iconLuna = document.getElementById("icon-luna");
  const iconSol = document.getElementById("icon-sol");

  // Restaurar tema si está guardado
  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado) {
    html.setAttribute("data-bs-theme", temaGuardado);
    if (temaGuardado === "dark") {
      iconLuna.style.display = "none";
      iconSol.style.display = "inline";
    } else {
      iconLuna.style.display = "inline";
      iconSol.style.display = "none";
    }
  }

  toggle.addEventListener("click", () => {
    const actual = html.getAttribute("data-bs-theme") || "light";
    const nuevo = actual === "light" ? "dark" : "light";
    html.setAttribute("data-bs-theme", nuevo);
    localStorage.setItem("tema", nuevo);

    // Mostrar/ocultar íconos
    if (nuevo === "dark") {
      iconLuna.style.display = "none";
      iconSol.style.display = "inline";
    } else {
      iconLuna.style.display = "inline";
      iconSol.style.display = "none";
    }
  });
});