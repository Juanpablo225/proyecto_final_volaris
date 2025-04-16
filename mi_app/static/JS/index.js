document.addEventListener("DOMContentLoaded", function() {
    const dropZone = document.getElementById("dropZone");
    const fileList = document.getElementById("fileList");

    // Eliminar el input de archivos anterior y agregar uno nuevo cada vez
    function createFileInput() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "application/pdf";
        fileInput.multiple = true;
        fileInput.style.display = "none";  // Escondido, se activa al hacer click en el botón

        fileInput.addEventListener("change", function(event) {
            if (event.target.files.length > 0) {
                handleFiles(event.target.files);
            }
        });

        return fileInput;
    }

    // Crear el input al cargar la página
    let fileInput = createFileInput();
    document.body.appendChild(fileInput);

    // Cuando el usuario hace clic en el botón, activa el input de archivos
    document.querySelector(".upload-button").addEventListener("click", () => {
        fileInput.click();
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
        event.stopPropagation();
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
            listItem.classList.add("file-item");

            // Nombre del archivo
            let fileName = document.createElement("span");
            fileName.textContent = `${file.name} - ✅ Cargado con éxito`;
            listItem.appendChild(fileName);

            // Botón de eliminar
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Eliminar";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function() {
                fileList.removeChild(listItem);
            });
            listItem.appendChild(deleteBtn);

            fileList.appendChild(listItem);
        }
    }
});
