const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//! - Muestra los productos en el carrito

let total = 0;

const mostrarCarrito = () =>{
    const lista = document.getElementById("lista-carrito")
    lista.innerHTML = ""

    if(carrito.length === 0){
        lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>'
        return
    }
    carrito.forEach((item, indice) =>{
        const producto = document.createElement("article")
        producto.classList.add("producto")
        producto.innerHTML=`
        <img src="./img/${item.imagen}" alt="${item.nombre}" class="producto-imagen">
        <h2>${item.nombre}</h2>
        <p class = "precio">$${item.precio}</p>
        <button class="btn-quitar" type="button" onclick="eliminarDelCarrito(${indice})">
            <span class="button__text">Quitar</span>
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
        </button>`

        

       
        lista.appendChild(producto);

        total += item.precio;
    });

    const totalCarrito = document.createElement("p");
    totalCarrito.classList.add("total-pedido")
    totalCarrito.textContent = `Total: $${total}`;
    lista.appendChild(totalCarrito);  
     
}

//! Elimina un producto del carrito

const eliminarDelCarrito = (indice) =>{
    carrito.splice(indice, 1)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    mostrarCarrito()
}

//! Simule la compra

const realizarCompra = () =>{
    alert("Compra realizada con éxito")
    localStorage.removeItem("carrito")
    window.location.href="index.html"
}

//! Inicializar el carrito al cargar la página

mostrarCarrito()




