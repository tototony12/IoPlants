"use strict";

localStorage.sessionId;
localStorage.sessionEmail;
localStorage.userId;
localStorage.plantName;

let imagenPlanta = document.getElementById('imagenPlanta');
let graficas = document.getElementById('graficas');
let nombrePlanta = document.getElementById('nombrePlanta');
let img = document.getElementById('img');

//VALIDAR USUARIO LOGUEADO
function onLoad() {
    if (localStorage.sessionId == undefined || localStorage.sessionId == "") {
        console.log("no hay usuario logueado");
        window.location.href="login.html";
    } else {
        console.log("usuario logueado");
    }
}

let signout = document.querySelector("#signOut");
//SIGN OUT 
function signOut() {
    localStorage.clear();
}

signout.addEventListener("click", signOut);

function jitomate(){
    nombrePlanta.textContent = "Jitomate"
    localStorage.plantName = "jitomate";
    img.src= "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/02/jitomate3.jpg"
    imagenPlanta.style.display = '';
    graficas.style.display = '';
}
function lechuga(){
    localStorage.plantName = "lechuga";
    imagenPlanta.style.display = '';
    img.src = "https://biotrendies.com/wp-content/uploads/2015/07/lechuga-1000x600.jpg";
    graficas.style.display = 'none';
}
function cebolla(){
    localStorage.plantName = "cebolla";
    imagenPlanta.style.display = '';
    img.src = "http://geneseeds.com.mx/wp-content/uploads/Cebolla-Crystal-White-Wax.png";
    graficas.style.display = 'none';
}