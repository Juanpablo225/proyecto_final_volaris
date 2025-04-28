// Mostrar el modal
document.querySelector('.agregar-cuenta-btn').addEventListener('click', function () {
    document.getElementById('form-agregar').reset();
    document.getElementById('modal-agregar').style.display = 'block';
});

// Cerrar el modal
function cerrarModal() {
    document.getElementById('form-agregar').reset();
    document.getElementById('modal-agregar').style.display = 'none';
}

// Cerrar si se hace clic fuera del modal
window.onclick = function(event) {
    const modal = document.getElementById('modal-agregar');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
//Validacion de Foto de Perfil
document.querySelector("form").addEventListener("submit", function(e) {
    const fileInput = document.getElementById("foto");
    const file = fileInput.files[0];

    if (file) {
        const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validImageTypes.includes(file.type)) {
            alert("Por favor, selecciona una imagen válida (jpg, png, webp).");
            e.preventDefault(); // evita el envío del formulario
        }
    }
});

//Scripts para modal de boton editar by buga
// Cierra el modal de edición
function cerrarModalEditar() {
  eliminarFotoPreview();
  document.getElementById('form-editar').reset();
  document.getElementById('modal-editar').style.display = 'none';
}

// Dispara el input oculto para subir foto y muestra previsualización
function subirFoto() {
  var fileInput = document.getElementById('editar-foto');
  fileInput.click();
  fileInput.onchange = function() {
    var file = this.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var preview = document.getElementById('preview-foto');
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  };
}

// Elimina la imagen de previsualización
function eliminarFotoPreview() {
  var preview = document.getElementById('preview-foto');
  preview.src = '';
  preview.style.display = 'none';
  document.getElementById('editar-foto').value = null;
}

// Confirmación y envío de eliminación de cuenta
function eliminarCuenta() {
  if (confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) {
    document.getElementById('form-editar').action = '/usuarios/eliminar';
    document.getElementById('form-editar').submit();
  }
}

// Al cargar la página, asigna el disparador del modal a todos los botones .action-button
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.action-button').forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      // Abre el modal sin cargar datos para edición vacía
      document.getElementById('modal-editar').style.display = 'block';
    });
  });

  // Cierra el modal si se hace clic fuera de él
  window.addEventListener('click', function(event) {
    var modal = document.getElementById('modal-editar');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});


// Menú desplegable
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
}
