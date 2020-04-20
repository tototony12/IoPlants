"use strict";
localStorage.sessionId;
localStorage.sessionEmail;
localStorage.userId;

//VARIABLES FROM INPUT TEXTS
let userEmail = document.querySelector('#userEmail');
let userPassword = document.querySelector('#userPassword');

//ON LOAD
function ponLoad() {
    userPassword.value = "Textoplano";
    userEmail.value = localStorage.sessionEmail;
    userEmail.disabled = true;
    userPassword.disabled = true;
}

//CLICK EDIT
function editUsr() {
    let xhr = new XMLHttpRequest();
    console.log(userEmail.value);
    let endpoint = `http://localhost:3000/users/?Email=${userEmail.value}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            let user = JSON.parse(xhr.response);
            if (user[0].Password == userPassword.value) {
                alert(`Bienvenido ${user[0].Email}`);
                localStorage.sessionId = "TOKEN";
                localStorage.sessionEmail = user[0].Email;
                localStorage.userId = user[0].id;
                window.location.href="index.html";
            }else{
                alert("Usuario o contraseña incorrectos");
            }
        } else if (xhr.status == 404) {
            alert("Error de conexion");
        }
    }
}