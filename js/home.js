/* ------------------------------------
Proyecto Final - Rafael Aguasvivas
Comision 43085
------------------------------------ */

// Capturando el icono del carrito para luego cambiarle el estilo
const carritoIcon = document.getElementById('carrito-icon');

// Capturar todos los botones del plan
const elegirPlan = document.querySelectorAll('.btn');

// Agregar un eventListener a todos los botones
elegirPlan.forEach(function(button) {
    button.addEventListener('click', function() {
        // Capturar los detalles de los planes
        const card = this.parentNode.parentNode;
        const planName = card.querySelector('.pack').textContent;
        const price = card.querySelector('.price').textContent;
        const precioInt = price.replace(/^./, ""); // Removemos el signo $ de nuestro precio.

        // Corremos la funcion agregarAlCarrito
        agregarAlCarrito(planName, precioInt);
    });
});

// Creamos un array para el carrito
let carrito = [];

// Una funcion para agregar el plan seleccionado al array carrito
function agregarAlCarrito(planName, precioInt) {
    carrito = []; // Como no queremos que se agreguen mas de un plan al carrito, limpiamos el array cada vez que se agrega un plan.

    // Agregamos Tostify a nuestro proyecto
    Toastify({
        text: "Plan agregado al carrito",
        duration: 3000,
        destination: "checkout.html",
        newWindow: false,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "#10B981",
        },
        onClick: function(){}
    }).showToast();

    // Le asignamos la clase .con-producto al carrito
    carritoIcon.classList.add('con-producto');

    // Creamos el objeto plan
    const plan = {
        name: planName,
        price: precioInt
    };

    // Agregamos el plan seleccionado al carrito
    carrito.push(plan);
    console.log('Plan agregado al carrito.');
    console.log(carrito)

    // Guardamos el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para limpiar el carrito y borrar los datos del localStorage
function limpiarCarrito() {
    localStorage.removeItem('carrito');
    carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
}