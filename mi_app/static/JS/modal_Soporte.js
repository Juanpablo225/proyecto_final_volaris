function abrirModalSoporte() {
  document.getElementById("modal-soporte").style.display = "block";
}

function cerrarModalSoporte() {
  document.getElementById("modal-soporte").style.display = "none";
}

// Cierre al hacer clic fuera del modal
window.addEventListener("click", function(event) {
  const modal = document.getElementById("modal-soporte");
  if (modal && event.target === modal) {
    modal.style.display = "none";
  }
});
