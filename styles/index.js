document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const iconLuna = document.getElementById("icon-luna");
  const iconSol = document.getElementById("icon-sol");

  // Restaurar tema guardado
  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado) {
    html.setAttribute("data-bs-theme", temaGuardado);
    iconLuna.style.display = temaGuardado === "dark" ? "none" : "inline";
    iconSol.style.display = temaGuardado === "dark" ? "inline" : "none";
  }

  // Toggle modo oscuro
  toggle.addEventListener("click", () => {
    const actual = html.getAttribute("data-bs-theme") || "light";
    const nuevo = actual === "light" ? "dark" : "light";
    html.setAttribute("data-bs-theme", nuevo);
    localStorage.setItem("tema", nuevo);

    iconLuna.style.display = nuevo === "dark" ? "none" : "inline";
    iconSol.style.display = nuevo === "dark" ? "inline" : "none";
  });
});
