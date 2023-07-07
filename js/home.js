/* ------------------------------------
Proyecto Final - Rafael Aguasvivas
Comision 43085
------------------------------------ */

// Capturar todos los botones del plan
const elegirPlan = document.querySelectorAll('.btn');

// Capturar el modal y los botones del modal
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const checkoutBtn = document.getElementById('checkout-btn');
const limpiarCarritoBtn = document.getElementById('limpiar-carrito');

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

// Event listener para abrir el modal
document.getElementById('carrito-icon').addEventListener('click', function() {
    console.log('Icono del carrito clickeado');
    modal.style.display = 'block';
});

// Event listener para cerrar el modal al hacer clic en la "x"
document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
});

// Event listener para cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Event listener para el botón de ir al checkout
checkoutBtn.addEventListener('click', function() {
    // Lógica para redirigir al checkout
});

// Event listener para el botón de limpiar carrito
limpiarCarritoBtn.addEventListener('click', function() {
    limpiarCarrito();
});

// Creamos un array para el carrito
let carrito = [];

// Una funcion para agregar el plan seleccionado al array carrito
function agregarAlCarrito(planName, precioInt) {
    carrito = [];
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