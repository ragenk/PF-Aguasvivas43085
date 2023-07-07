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
                            <table>
                                <tr>
                                    <th>Plan Seleccionado</th>
                                    <th class="th-right">Precio</th>
                                </tr>
                                <tr>
                                    <td class="th-plan">${planName}</td>
                                    <td class="th-right th-precio">$${planPrice}</td>
                                </tr>
                            </table>
                            `;

    // Agregar el elemento del plan al contenedor del carrito
    carritoContainer.appendChild(planElement);
});

} else {
    // Mostrar un mensaje si el carrito está vacío
    const emptyMessage = document.createElement('p');
    emptyMessage.innerHTML = `
                            <div class="vacio-container">
                                <p>El carrito está vacío. <a href="home.html">Volver a seleccionar.</a></p>
                            </div>`;
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
    carritoContainer.innerHTML = `
                                <div class="vacio-container">
                                    <p>El carrito está vacío. <a href="home.html">Volver a seleccionar.</a></p>
                                </div>`;
}

// Funcion para completar la compra usando Sweet Alert
function completarCompra() {
    // Confirmamos que el carrito no este vacio
    if (carritoLocal && carritoLocal.length > 0) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: 'btn',
            cancelButton: 'btn btn-red'
            },
            buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: "Estas a punto de procesar la orden.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'No, cancela la orden',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Orden Completada',
                'Gracias por contratar nuestros servicios.',
                'success'
            )
            } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire(
                'Orden Cancelada',
                'Aquí estaremos si cambias de opinion.',
                'error'
            )
            }
        })
    } else {
        Swal.fire('El carrito está vacio.')
    }
}