/* ------------------------------------
Proyecto Final - Rafael Aguasvivas
Comision 43085
------------------------------------ */

// Variables y Arrays
const arrUsers = JSON.parse(localStorage.getItem("arrUsers")) || [];
const arrAvatar = ['/img/avatar1.png','/img/avatar2.png','/img/avatar3.png','/img/avatar4.png']
const username = document.getElementById("username");
const password = document.getElementById("pwd");
const container = document.querySelector('.container');
const invalidUser = document.getElementById("invalidUser");
const invalidPassword = document.getElementById("invalidPassword");
const registroBtn = document.getElementById("registroBtn");
const entrarBtn = document.getElementById("entrarBtn");

// Funcion para generar un avatar random
function randomAvatar() {
    for (let i = 0; i < arrAvatar.length; i++) {
        let avatar = Math.floor(Math.random()*arrAvatar.length);
        return arrAvatar[avatar];
    }
}

// Funcion para dar de alta al usuario
function userSignup() {
    invalidUser.innerText = "";
    invalidPassword.innerText = "";

    // Condicional para validar datos introducidos
    if ((!username.value || username.value === "")) {
        invalidUser.innerText = "Introduce un usuario válido."
    } else if ((!password.value || password.value === "")) {
        invalidPassword.innerText = "Introduce una contraseña válida."
    } else {
        let user = {usuario:username.value, clave:password.value, avatar:randomAvatar()}; // Cuando llamamos a la funcion randomAvatar() se agrega un tercer atributo que es la imagen.
    
        arrUsers.push(user);

        let arrJSON = JSON.stringify(arrUsers); // Convertimos nuestro Array en un JSON antes de guardarlo en el localStorage

        localStorage.setItem("arrUsers", arrJSON);
        
        container.innerHTML = `<div>
                                    <h2>Usuario <span>${username.value}</span> creado con exito.<br>Ya puedes entrar a la plataforma con tu usuario.</h2>
                                </div>                
                                <div>
                                    <a href="index.html"><button class="btn">Volver</button></a>
                                </div>`
    }
}

// Funcion para entrar al sistema
function userLogin() {
    let usersDb = localStorage.getItem("arrUsers");

    usersDb = JSON.parse(usersDb);

    invalidUser.innerText = "";
    invalidPassword.innerText = "";

    for( let user of usersDb ){
        if ((!username.value || username.value === "")) {
            invalidUser.innerText = "Introduce un usuario válido."
        } else if ((!password.value || password.value === "")) {
            invalidPassword.innerText = "Introduce una contraseña válida."
        } else if ( user.usuario == username.value  && user.clave == password.value){
            container.innerHTML = `<div class="img-container">
                                        <img src="${user.avatar}" alt="Avatar de usuario.">
                                    </div>
                                    <div>
                                        <h2>Bienvenido/a a la plataforma: <span>${user.usuario}</span></h2>
                                    </div>`;

            // Entrar a area restringida despues de hacer login.
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1500);

            break

        } else {
            container.innerHTML = `<div>
                                        <h2>Usuario o password no encontrados.</h2>
                                    </div>
                                    <div>
                                        <a href="login.html"><button class="btn">Volver</button></a>
                                    </div>`;
        }
    }
}

registroBtn.addEventListener("click" , userSignup );
entrarBtn.addEventListener("click" , userLogin);