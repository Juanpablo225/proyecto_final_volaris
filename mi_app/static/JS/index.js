document.addEventListener("DOMContentLoaded", function() {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");

    // Evita el comportamiento por defecto que abre los archivos
    document.addEventListener("dragover", (event) => event.preventDefault());
    document.addEventListener("drop", (event) => event.preventDefault());

    // Cuando el usuario hace clic en el botón, activa el input de archivos
    document.querySelector(".upload-button").addEventListener("click", () => {
        fileInput.click();
    });

    // Manejar archivos seleccionados manualmente
    fileInput.addEventListener("change", function(event) {
        handleFiles(event.target.files);
    });

    // Drag and Drop
    dropZone.addEventListener("dragover", function(event) {
        event.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", function() {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", function(event) {
        event.preventDefault();
        event.stopPropagation(); // Evita que se propague el evento y abra el archivo en otra ventana
        dropZone.classList.remove("dragover");
        handleFiles(event.dataTransfer.files);
    });

    // Función para manejar los archivos y mostrarlos en la lista
    function handleFiles(files) {
        fileList.innerHTML = ""; // Limpiar la lista antes de añadir nuevos archivos
        for (let file of files) {
            if (file.type !== "application/pdf") {
                alert("Solo se permiten archivos PDF.");
                continue;
            }

            let listItem = document.createElement("li");
            listItem.classList.add("file-item"); // Clase para cada elemento de la lista

            // Nombre del archivo
            let fileName = document.createElement("span");
            fileName.textContent = `${file.name} - ✅ Cargado con éxito`;
            listItem.appendChild(fileName);

            // Botón de eliminar
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delate";
            deleteBtn.classList.add("delete-btn"); // Clase para el botón de eliminar
            deleteBtn.addEventListener("click", function() {
                fileList.removeChild(listItem); // Elimina el archivo de la lista
            });
            listItem.appendChild(deleteBtn);

            fileList.appendChild(listItem);
        }
    }
});

