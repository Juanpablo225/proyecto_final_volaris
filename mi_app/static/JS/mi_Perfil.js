document.addEventListener("DOMContentLoaded", function () {
    // Solo ejecutar si existe el modal de contraseña
    const modal = document.getElementById("modalContra");
    const btn = document.querySelector(".btn-cambiar-contra");

    if (modal && btn) {
        btn.addEventListener("click", function () {
            document.getElementById('contra-actual').value = '';
            modal.style.display = "block";
        });

        window.cerrarModal = function () {
            document.getElementById('contra-actual').value = '';
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                cerrarModal();
            }
        };
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalContra");
    const nuevoModal = document.getElementById("modalNuevaContra");
    const btn = document.querySelector(".btn-cambiar-contra");

    if (modal && btn) {
        btn.addEventListener("click", function () {
            document.getElementById('contra-actual').value = '';
            modal.style.display = "block";
        });

        window.cerrarModal = function () {
            modal.style.display = "none";
        };

        window.abrirNuevoModal = function () {
            cerrarModal(); // Cierra el modal actual
            nuevoModal.style.display = "block";
        };

        window.cerrarNuevoModal = function () {
            nuevoModal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                cerrarModal();
            } else if (event.target === nuevoModal) {
                cerrarNuevoModal();
            }
        };
    }
});
const nuevaContraForm = document.getElementById("nueva-contra-form");

if (nuevaContraForm) {
    nuevaContraForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que se recargue la página

        // Opcional: aquí podrías validar que ambas contraseñas coincidan

        // Mostrar mensaje de sistema
        alert("Contraseña cambiada");

        // Cerrar el modal
        cerrarNuevoModal();

        // Limpiar campos (opcional)
        document.getElementById("nueva-contra").value = "";
        document.getElementById("repetir-contra").value = "";
    });
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
