const input = document.getElementById("searchInput");
const filas = document.querySelectorAll("#tablaArchivos tr");

// Función para mostrar y ocultar el menú desplegable
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
}

               // Función para seleccionar o desmarcar todas las casillas
function selectAllFiles() {
    const checkboxes = document.querySelectorAll('.file-checkbox');
    const selectAllButton = document.getElementById('select-all-button');
    const isChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = !isChecked;
    });

    if (isChecked) {
        selectAllButton.textContent = "Seleccionar Todos";
    } else {
        selectAllButton.textContent = "Deseleccionar Todos";
        }
    }

// Función para descargar los archivos seleccionados
function downloadSelectedFiles() {
    const checkboxes = document.querySelectorAll('.file-checkbox:checked');
    if (checkboxes.length === 0) {
        alert("No has seleccionado ningún archivo.");
        return;
    }

    checkboxes.forEach(function(checkbox) {
        const fileName = checkbox.getAttribute('data-file');
        const link = document.createElement('a');
        link.href = fileName; // Asumimos que los archivos están en la misma ruta
        link.download = fileName; // Establece el nombre del archivo para la descarga
        link.click(); // Inicia la descarga
    });
}

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que el formulario se envíe si hay uno
        buscarGuia(input.value.trim());
    }
});

function buscarGuia(valor) {
    let encontrado = false;

    filas.forEach(fila => {
        const celdaGuia = fila.querySelector("td");
        if (celdaGuia && celdaGuia.textContent.trim() === valor) {
            fila.style.display = "";
            encontrado = true;
        } else {
            fila.style.display = "none";
        }
    });

    if (!encontrado) {
        alert("No se encontró ninguna guía con ese número.");
    }
}

function restablecerBusqueda() {
    input.value = "";
    filas.forEach(fila => {
        fila.style.display = "";
    });
}

function previewFile(fileUrl) {
    const modal = document.getElementById("previewModal");
    const pdfViewer = document.getElementById("pdfViewer");

    pdfViewer.src = fileUrl;

    modal.style.display = "flex";
}

function closePreview() {
    const modal = document.getElementById("previewModal");
    const pdfViewer = document.getElementById("pdfViewer");

    // Detener la carga del PDF cuando se cierra el modal
    pdfViewer.src = "";

    // Cierra el modal
    modal.style.display = "none";
}

// Cierra el modal si el usuario hace clic fuera del modal
window.onclick = function (event) {
    const modal = document.getElementById("previewModal");
    if (event.target === modal) {
        closePreview();
    }
};




// Función para filtrar por fechas
function filtrarPorFechas() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const fechaInicio = new Date(startDate);
    const fechaFin = new Date(endDate);

    fechaInicio.setHours(0, 0, 0, 0);
    fechaFin.setHours(23, 59, 59, 999);

    // Obtener solo la parte de la fecha (sin horas, minutos, segundos)
    const fechaInicioComparable = fechaInicio.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const fechaFinComparable = fechaFin.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    filas.forEach(fila => {
        const fechaStr = fila.getAttribute("data-fecha");
        const fechaDoc = new Date(fechaStr);

        // Obtener solo la parte de la fecha de la fila (sin horas, minutos, segundos)
        const fechaDocComparable = fechaDoc.toISOString().split('T')[0]; // 'YYYY-MM-DD'

        if (fechaDocComparable >= fechaInicioComparable && fechaDocComparable <= fechaFinComparable) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}