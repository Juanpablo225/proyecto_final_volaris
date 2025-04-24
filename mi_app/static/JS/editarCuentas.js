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


// Menú desplegable
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
}
