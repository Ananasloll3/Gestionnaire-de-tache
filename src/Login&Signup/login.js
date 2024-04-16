let email = document.getElementById("email");
let password = document.getElementById("password");


document.addEventListener('DOMContentLoaded', async function() {
    // Sélection du formulaire et du bouton
    var formulaire = document.getElementById('formulaire');
    var bouton = document.getElementById('bouttonSubmit');
    

    // Écouteur d'événement pour la soumission du formulaire
    formulaire.addEventListener('submit', function(event) {

        if (email.value == "" || email.innerHTML.length < 1) {
            
        }
        else
        {
            if (password.value == "" ||username.innerHTML.length < 1) {
                
            }
            else
            {
                event.preventDefault();
                let valeur = envoyeToDataBase();
                if (!valeur) {
                    return 0;
                }
                else
                {
                    window.location.href = "../Page-Principale/index.html";
                }
            }
        }
    });
  

    // Si vous souhaitez également détecter le clic sur le bouton de soumission
    bouton.addEventListener('click', async function(event) {

        if (email.value === "" || email.innerHTML.length < 0) {
            
        }
        else
        {
            if (password.value === "" ||password.innerHTML.length < 0) {
                
            }
            else
            {
                event.preventDefault();
                let value = false;
                for (let i = 0; i < 2; i++) {
                    value = await electronAPI.RecupDataBaseIPC("./src/DATA/USER/USER.db", "user", email.value, "email", password.value, "password");
                    await electronAPI.getInfoUser();
                }
                let fetchValue = fetch("./tmp.temp");
                let infoUser = (await (await fetchValue).text()).split("\n");

                if (infoUser[2] === email.value && infoUser[1] === password.value) {
                    window.location.href = "../Page-Principale/index.html";
                    console.log("connexion reussi");    
                }
                else
                {
                    alert("Mauvais email ou mot de passe");
                    return 0;
                }
                
            }
        }
        

    });
  });
