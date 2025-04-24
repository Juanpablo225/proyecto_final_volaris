const input = document.getElementById("searchInput");
const filas = Array.from(document.querySelectorAll("#tablaArchivos tr"));

// Estado global para filtros
let filtroTexto = "";
let filtroFechaInicio = null;
let filtroFechaFin = null;

// Variables de paginación
let currentPage = 1;
let rowsPerPage = 10;

// Menús
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
}

// Selección de archivos
function selectAllFiles() {
    const checkboxes = document.querySelectorAll('.file-checkbox');
    const selectAllButton = document.getElementById('select-all-button');
    const isChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

    checkboxes.forEach(checkbox => checkbox.checked = !isChecked);
    selectAllButton.textContent = isChecked ? "Seleccionar Todos" : "Deseleccionar Todos";
}

function downloadSelectedFiles() {
    const checkboxes = document.querySelectorAll('.file-checkbox:checked');
    if (checkboxes.length === 0) {
        alert("No has seleccionado ningún archivo.");
        return;
    }

    checkboxes.forEach(checkbox => {
        const fileName = checkbox.getAttribute('data-file');
        const link = document.createElement('a');
        link.href = fileName;
        link.download = fileName;
        link.click();
    });
}

// Vista previa
function previewFile(fileUrl) {
    const modal = document.getElementById("previewModal");
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.src = fileUrl;
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
}

function closePreview() {
    const modal = document.getElementById("previewModal");
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.src = "";
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
}

window.onclick = function (event) {
    const modal = document.getElementById("previewModal");
    if (event.target === modal) closePreview();
};

// Filtros
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        filtroTexto = input.value.trim();
        currentPage = 1;
        applyFiltersAndPaginate();
    }
});

input.addEventListener("input", function () {
    if (input.value.trim() === "") {
        filtroTexto = "";
        currentPage = 1;
        applyFiltersAndPaginate();
    }
});

function restablecerBusqueda() {
    input.value = "";
    filtroTexto = "";
    filtroFechaInicio = null;
    filtroFechaFin = null;
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    currentPage = 1;
    applyFiltersAndPaginate();
}

function filtrarPorFechas() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    filtroFechaInicio = startDate ? new Date(startDate) : null;
    filtroFechaFin = endDate ? new Date(endDate) : null;

    if (filtroFechaInicio) filtroFechaInicio.setHours(0, 0, 0, 0);
    if (filtroFechaFin) filtroFechaFin.setHours(23, 59, 59, 999);

    currentPage = 1;
    applyFiltersAndPaginate();
}

// Paginación con filtros aplicados
function applyFiltersAndPaginate() {
    const filasFiltradas = filas.filter(fila => {
        const celdaGuia = fila.querySelector("td");
        const fechaStr = fila.getAttribute("data-fecha");
        const fechaDoc = new Date(fechaStr);

        const coincideGuia = !filtroTexto || (celdaGuia && celdaGuia.textContent.trim() === filtroTexto);
        const coincideFecha =
            (!filtroFechaInicio || fechaDoc >= filtroFechaInicio) &&
            (!filtroFechaFin || fechaDoc <= filtroFechaFin);

        return coincideGuia && coincideFecha;
    });

    const totalRows = filasFiltradas.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    filas.forEach(fila => fila.style.display = 'none');

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    filasFiltradas.slice(start, end).forEach(fila => fila.style.display = '');

    renderPaginationButtons(totalPages);

    if (filtroTexto && filasFiltradas.length === 0) {
        alert("No se encontró ninguna guía con ese número.");
    }
}

function renderPaginationButtons(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        currentPage--;
        applyFiltersAndPaginate();
    };
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.toggle('active', i === currentPage);
        btn.onclick = () => {
            currentPage = i;
            applyFiltersAndPaginate();
        };
        paginationContainer.appendChild(btn);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Siguiente';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        currentPage++;
        applyFiltersAndPaginate();
    };
    paginationContainer.appendChild(nextButton);
}

function changeRowsPerPage() {
    const selector = document.getElementById('rowsPerPage');
    rowsPerPage = parseInt(selector.value, 10);
    currentPage = 1;
    applyFiltersAndPaginate();
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', () => {
    applyFiltersAndPaginate();
});

// Abrir el modal y cargar datos actuales del archivo
document.querySelectorAll('.edit-button').forEach((btn, index) => {
    btn.removeAttribute('download'); // Elimina el atributo de descarga
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const row = btn.closest('tr');
        const guia = row.cells[0].textContent.trim();
        const fecha = row.getAttribute('data-fecha');

        document.getElementById('editGuia').value = guia;

        // Convertir formato fecha "2025-04-01 10:30 AM" a tipo datetime-local
        const parsedDate = new Date(fecha);
        const formattedDate = parsedDate.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
        document.getElementById('editFecha').value = formattedDate;

        document.getElementById('editRowIndex').value = index;
        document.getElementById('editModal').style.display = 'flex';
    });
});

// Cerrar modal
function cerrarModalEdicion() {
    document.getElementById('editModal').style.display = 'none';
}

// Guardar cambios realizados en el modal
function guardarCambios() {
    const index = document.getElementById('editRowIndex').value;
    const nuevaGuia = document.getElementById('editGuia').value.trim();
    const nuevaFecha = new Date(document.getElementById('editFecha').value);

    if (!nuevaGuia || !nuevaFecha) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const rows = document.querySelectorAll("#tablaArchivos tr");
    const targetRow = rows[index];

    targetRow.cells[0].textContent = nuevaGuia;
    targetRow.setAttribute('data-fecha', nuevaFecha.toISOString());
    targetRow.cells[1].textContent = nuevaFecha.toLocaleString();

    cerrarModalEdicion();
    applyFiltersAndPaginate(); // Reaplica filtros en caso de que se vea afectado
}