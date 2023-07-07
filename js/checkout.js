/* ------------------------------------
Proyecto Final - Rafael Aguasvivas
Comision 43085
------------------------------------ */

// Recuperar el contenido del carrito del localStorage
const carritoLocal = JSON.parse(localStorage.getItem('carrito'));

// Obtener el contenedor del carrito
const carritoContainer = document.getElementById('carrito-container');

// Generar el contenido del carrito dinámicamente
if (carritoLocal && carritoLocal.length > 0) {
    carritoLocal.forEach(function(plan) {
    const planName = plan.name;
    const planPrice = plan.price;

    // Crear elementos HTML para mostrar los detalles del plan
    const planElement = document.createElement('div');
    planElement.innerHTML = `
                            <p>${planName}</p>
                            <p>${planPrice}</p>
                            `;

    // Agregar el elemento del plan al contenedor del carrito
    carritoContainer.appendChild(planElement);
});

} else {
    // Mostrar un mensaje si el carrito está vacío
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'El carrito está vacío.';
    carritoContainer.appendChild(emptyMessage);
}

// Agregar un eventListener al botón de limpiar carrito
    const limpiarCarritoButton = document.getElementById('limpiar-carrito');
    limpiarCarritoButton.addEventListener('click', function() {
    // Limpiar el carrito y borrar los datos del localStorage
    limpiarCarrito();
});

// Función para limpiar el carrito y borrar los datos del localStorage
function limpiarCarrito() {
    localStorage.removeItem('carrito');
    carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
}