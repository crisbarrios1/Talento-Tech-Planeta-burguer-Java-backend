let carrito = [];
const button = document.querySelector("button")

const agregarAlCarrito = (nombre, precio, imagen) =>{
    //Agregar el producto como un objeto al carrito
    carrito.push({nombre, precio, imagen})
    
    actualizarContador();
    
    // alert(`Agregaste: ${nombre} al carrito`)

}


const actualizarContador = () =>{
     document.querySelector("#contador-carrito").textContent = carrito.length
     
    
}
//! Guarda el contenido del carrito en el almacenamiento local antes de cerrar la página



window.addEventListener("beforeunload", () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito))

})





