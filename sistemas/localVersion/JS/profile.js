"use strict";
localStorage.sessionId;
localStorage.sessionEmail;
localStorage.userId;
localStorage.btnState;

//VARIABLES FROM INPUT TEXTS
let userEmail = document.querySelector('#userEmail');
let userPassword = document.querySelector('#userPassword');
let profileButton = document.querySelector('#profileButton');

//CARGA DATOS DEL USUARIO Y VALIDAR USUARIO LOGUEADO
function ponLoad() {
    console.log("usuario logueado");
    userPassword.value = "Textoplano";
    userEmail.value = localStorage.sessionEmail;
    userEmail.disabled = true;
    userPassword.disabled = true;
    localStorage.btnState = "edit";
    
    if (localStorage.sessionId == undefined || localStorage.sessionId == "") {
        console.log("no hay usuario logueado");
        window.location.href="login.html";
    } 
}

//CLICK EDIT
function editUsr() {
    if(localStorage.btnState == "edit"){
        userEmail.value = localStorage.sessionEmail;
        userEmail.disabled = false;
        userPassword.disabled = false;
        userPassword.value = "";
        profileButton.innerHTML = "Save";
        localStorage.btnState = "save";
    }
    else{
        localStorage.btnState = "edit";
        
        let user = {};

        user.email =  userEmail.value;
        user.password = userPassword.value;
    
        console.log(localStorage.sessionEmail);


        let xhr = new XMLHttpRequest();
        let endpoint = `http://localhost:3000/api/users/${localStorage.sessionEmail}`
        xhr.open('PUT', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(user));
        xhr.onload = () => {
            if(xhr.status == 201){
                alert("User changed");
                window.location.href="index.html";
            }else{
                console.log(xhr.response);
                alert('Error');
            }
        }
        
    }
}
