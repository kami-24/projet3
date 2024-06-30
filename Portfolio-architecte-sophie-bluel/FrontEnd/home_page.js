//La requête pour envoyer les valeurs des entrees de mon formulaire de la page home_page.html 
async function formulaire(){
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       body: JSON.stringify({
            email: document.querySelector("#email").value,
            password: document.querySelector("#mot_passe").value
            
        })
   
    });
    console.log(document.querySelector("#email").value);
    console.log(document.querySelector("#mot_passe").value);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
            //Stocker le token d'authentification pour réaliser les envois et suppression de travaux
    //LocalStorage is a type of web storage that allows JavaScript websites and apps to store and access data right in the browser with no expiration time. This means the data stored in the browser will persist even after the browser window has been closed.
    localStorage.setItem("token", data.token);


        // Rediriger vers la page d'accueil
        window.location.href = "index.html";

   
    } else {
        // Afficher un message d'erreur
        alert("Erreur : le nom d'utilisateur ou le mot de passe est incorrect" )
    }

    

}

document.addEventListener("DOMContentLoaded", function() {
document.querySelector(".formulaire").addEventListener("submit", async function(event) {
    event.preventDefault();
    await formulaire();
    console.log('test mode edition')
 /*   const mode_edition=document.createElement('div')
    mode_edition.classList.add('mode_edition')
    document.body.appendChild(mode_edition)

    const bouton_mode_edition=document.createElement('button')
    bouton_mode_edition.classList.add('fa-regular fa-pen-to-square')
    mode_edition.appendChild(bouton_mode_edition)*/
});});
























//if the username and password are correct then the user is redirected to the page index.html
//
/*
document.querySelector(".bouton").addEventListener("click", async function(){
    // Désactivation du comportement par défaut du navigateur
    //event.preventDefault();
    formulaire();
    window.location.href = "index.html";
})*/
// Gestion de l'événement de soumission du formulaire
