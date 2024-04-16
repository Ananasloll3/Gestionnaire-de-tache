let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");


document.addEventListener('DOMContentLoaded', function() {
    // Sélection du formulaire et du bouton
    var formulaire = document.getElementById('formulaire');
    var bouton = document.getElementById('bouttonSubmit');
    

    // Écouteur d'événement pour la soumission du formulaire
    formulaire.addEventListener('submit', async function(event) {

        if (username.value == "")
        {
            return;
        }
        if (username.value.length <= 6) 
        {
            event.preventDefault();
            alert("Veuillez mettre un nom d'utilisateur de plus de 6 caractere")
            return;
        }
        if (password.value === "") 
        {
             return;
        }
        if (password.value.length <= 8) 
        {
            event.preventDefault();
            alert("Le mot de passe doit contenir plus de 8 caractere");
            return;
        }
        if (confirmPassword.value === "") 
        {
            return;  
        }
        if (confirmPassword.value.length <= 8) 
        {
            event.preventDefault();
            alert("Le mot de passe doit contenir plus de 8 caractere");
            return;
        }

        if (password.value !== confirmPassword.value || password.value.length !== confirmPassword.value.length) 
        {
            event.preventDefault();
            alert("Les mot de passe sont different");
            return;
        }

        


        event.preventDefault();

        electronAPI.newUserDataBase(username.value, password.value, email.value);
        alert("Compte cree");
        window.location.href = "./login.html";

    });
  

    // Si vous souhaitez également détecter le clic sur le bouton de soumission
    bouton.addEventListener('click', async function(event) {

        if (username.value == "")
        {
            return;
        }
        if (username.value.length <= 6) 
        {
            event.preventDefault();
            alert("Veuillez mettre un nom d'utilisateur de plus de 6 caractere")
            return;
        }
        if (password.value === "") 
        {
             return;
        }
        if (password.value.length <= 8) 
        {
            event.preventDefault();
            alert("Le mot de passe doit contenir plus de 8 caractere");
            return;
        }
        if (confirmPassword.value === "") 
        {
            return;  
        }
        if (confirmPassword.value.length <= 8) 
        {
            event.preventDefault();
            alert("Le mot de passe doit contenir plus de 8 caractere");
            return;
        }

        if (password.value !== confirmPassword.value || password.value.length !== confirmPassword.value.length) 
        {
            event.preventDefault();
            alert("Les mot de passe sont different");
            return;
        }


        event.preventDefault();
        let getnew = await electronAPI.newUserDataBase(username.value, password.value, email.value);
        console.log(getnew);
        if (getnew === 1) {
            alert("nom d'utilisateur ou mail deja utiliser")
            return;
        }
        alert("Compte cree")
        window.location.href = "./login.html";
    
    });



  });