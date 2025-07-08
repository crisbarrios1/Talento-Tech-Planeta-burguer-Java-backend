// URL base de la API
const API_URL = "http://localhost:8080/api/articulos";

// Cuando se carga la página, mostramos el listado
document.addEventListener("DOMContentLoaded", listarArticulos);

// Manejador del formulario
document.getElementById("form-articulo").addEventListener("submit", guardarArticulo);

// Botón para cancelar edición
document.getElementById("cancelar").addEventListener("click", () => {
    // Limpiar todos los campos del formulario
    document.getElementById("form-articulo").reset();
    // Borrar el ID oculto del formulario
    document.getElementById("idArticulo").value = "";
});


function listarArticulos() {
    console.log("Iniciando fetch para listar artículos...");
    fetch(API_URL)
        .then(response => {
            console.log("Respuesta fetch: ", response);
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos: ", data);
            const tbody = document.getElementById("tabla-articulos");
            tbody.innerHTML = ""; // Limpiamos tabla
            if (data.length === 0) {
                // Si no hay datos, mostramos mensaje en la tabla
                const fila = document.createElement("tr");
                fila.innerHTML = `<td colspan="5" style="text-align:center;">No hay artículos para mostrar</td>`;
                tbody.appendChild(fila);
                return;
            }
            data.forEach(articulo => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${articulo.id}</td>
                    <td>${articulo.nombre}</td>
                    <td>${articulo.precio.toFixed(2)}</td>
                    <td><img src="${articulo.imagen}" alt="Imagen" style="width: 70px; height: auto;" /></td>
                    <td>
                        <button class="btnEditar" onclick="editarArticulo(${articulo.id})">Editar</button>
                        <button class="btnEliminar" onclick="eliminarArticulo(${articulo.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al listar artículos:", error));
}

// === Guardar o actualizar un artículo ===
function guardarArticulo(event) {
    event.preventDefault(); // Evitamos el comportamiento por defecto del formulario
      console.log("Enviando petición POST/PUT para guardar artículo...");

    // Obtenemos los valores de los campos del formulario
    const id = document.getElementById("idArticulo").value;
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const imagen = document.getElementById("imagen").value.trim();

    // Validación de campos
    if (!nombre || isNaN(precio) || precio < 0 || !imagen ) {
        alert("Por favor complete correctamente los campos.");
        return;
    }

    // Creamos un objeto artículo con los datos del formulario
    const articulo = { nombre, precio, imagen };
    
    // Determinamos si es una edición (PUT) o creación (POST)
    const url = id ? `${API_URL}/${id}` : API_URL;
    const metodo = id ? "PUT" : "POST";

    // Enviamos el artículo al backend usando fetch
    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
        body: JSON.stringify(articulo) // Convertimos el objeto a JSON
    })
    .then(response => {
        console.log("Respuesta recibida:", response);
        if (!response.ok) throw new Error("Error al guardar"); // Verificamos respuesta exitosa
        return response.json();
    })
    .then(() => {
        // Limpiamos el formulario y recargamos la tabla
              console.log("Artículo guardado con éxito.");

        document.getElementById("form-articulo").reset();
        document.getElementById("idArticulo").value = "";
        listarArticulos();
    })
    .catch(error => console.error("Error al guardar artículo:", error)); // Manejo de errores
}

// === Cargar artículo en el formulario para edición ===
function editarArticulo(id) {
    // Llamada GET para obtener los datos del artículo por su ID
    fetch(`${API_URL}/${id}`)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(articulo => {
            // Cargamos los datos del artículo en el formulario
            document.getElementById("idArticulo").value = articulo.id;
            document.getElementById("nombre").value = articulo.nombre;
            document.getElementById("precio").value = articulo.precio;
            document.getElementById("imagen").value = articulo.imagen;
        })
        .catch(error => console.error("Error al obtener artículo:", error)); // Manejo de errores
}

// === Eliminar un artículo ===
function eliminarArticulo(id) {
    // Confirmación antes de eliminar
    if (confirm("¿Deseás eliminar este artículo?")) {
        // Llamada DELETE al backend
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar");
            document.getElementById("imagen").blur();//Para hacer que el puntero no se pose sobre el input al eliminar un producto
            listarArticulos(); // Actualizamos la lista de artículos
        })
        .catch(error => console.error("Error al eliminar artículo:", error)); // Manejo de errores
    }
}
