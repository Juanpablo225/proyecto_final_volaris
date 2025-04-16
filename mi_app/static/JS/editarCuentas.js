// Mostrar el modal
document.querySelector('.agregar-cuenta-btn').addEventListener('click', function () {
    document.getElementById('modal-agregar').style.display = 'block';
});

// Cerrar el modal
function cerrarModal() {
    document.getElementById('modal-agregar').style.display = 'none';
}

// Cerrar si se hace clic fuera del modal
window.onclick = function(event) {
    const modal = document.getElementById('modal-agregar');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Menú desplegable
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
}
