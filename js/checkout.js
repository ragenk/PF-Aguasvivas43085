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
    
    // Insertamos API para convertir el precio de los paquetes (USD) a precio de moneda local
    const requestOptions = {
        method: 'GET',
    };

    // Realizar una solicitud fetch a la API de Geolocation por IP para obtener la moneda local
    fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=49ec7f2f3d724b088ef5a038f96fab4b", requestOptions)
        .then(response => response.json())
        .then(result => {

            const monedaLocal = result.country.currency
            
            // Realizar una solicitud fetch a la API de Currency para obtener la tasa de cambio
            fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
            .then((response) => response.json())
            .then((data) => {
                // Obtener la tasa de cambio de USD a la moneda objetivo
                const exchangeRate = data.rates[monedaLocal];
                console.log("Este es exchangeRate " + exchangeRate)

                // Calcular el precio en la moneda objetivo
                const planPriceTarget = planPrice * exchangeRate;

                // Crear elementos HTML para mostrar los detalles del plan con el precio convertido
                const planElement = document.createElement('div');
                planElement.innerHTML = `
                                        <table>
                                            <tr>
                                            <th>Plan Seleccionado</th>
                                            <th class="th-right">Precio (${monedaLocal})</th>
                                            </tr>
                                            <tr>
                                            <td class="th-plan">${carritoLocal[0].name}</td>
                                            <td class="th-right th-precio">$${planPriceTarget.toFixed(2)}</td>
                                            </tr>
                                        </table>
                                        `;

                // Agregar el elemento del plan al contenedor del carrito
                carritoContainer.appendChild(planElement);
                })
                .catch((error) => {
                // Mostrar un mensaje de error si no se puede obtener la tasa de cambio
                console.error('Error al obtener la tasa de cambio:', error);
                });

        })
        .catch(error => console.log('error', error));

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