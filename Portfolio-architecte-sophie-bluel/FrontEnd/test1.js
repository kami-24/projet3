async function afficherPhotos() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    const father = document.querySelector('.gallery');
// Faire une suppression de tout contenu
//
father.innerHTML=""
    data.forEach(element => {  
   //CREER UNE fonction avec les filtres pour ne pas repeter aussi ce bout de code dan les filtres 
        const figure = document.createElement('figure');
        father.appendChild(figure);

        const img = document.createElement('img');
        figure.appendChild(img);
        img.src = element.imageUrl; 

        
        const figcaption = document.createElement('figcaption');
        figure.appendChild(figcaption);
        figcaption.textContent = element.title; 
     
    });

    //Afficher le mode edition si le token est présent, on verifie l'etat de la connexion 
    const token = localStorage.getItem('token');
    if (token) {
        document.querySelector('.mode_edition').style.display = 'block';
    }
    
}

//afficherPhotos();

//Le bouton modifier doit etre visible si le token existe
// Le bouton logout doit etre present si le token existe sinon login 
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token'); 
    var bouton_modifier = document.getElementById('btn_modifier'); 
    if (token) {
      bouton_modifier.style.display = 'block'; 
      document.getElementById('login_logout').textContent = 'logout';
    } else {
      bouton_modifier.style.display = 'none';
      document.getElementById('login_logout').textContent = 'login';
    }
  });

//Quand on clique sur le bouton logout on est rediriger vers la page home_page.html
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token'); 
    var bouton_modifier = document.getElementById('login_logout'); 
    if (token) {
        console.log("test")
        bouton_modifier.addEventListener('click', ()=> {
              // Supprime le token du localStorage
              console.log("test2")
        localStorage.removeItem('token');
            window.location.href = 'home_page.html';
        });
    } 
  });



/*document.getElementById('login_logout').addEventListener('click', function() {
    const token = localStorage.getItem('token'); 
    if(token){
        window.location.href = 'home_page.html';
    }
});*/

document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    const token = localStorage.getItem('token');
    if(token){
        return;
    }
    else{
    const tableau_categorie = data.map(element => element.category.name);
    const monSet = new Set(["Tous",...tableau_categorie]); // Création d'un ensemble Set à partir du tableau
    console.log("MON Set")
    console.log(monSet)
    //const father = document.querySelector('#portfolio');
   const father = document.querySelector('#containeur_bouton');
    // Creer un container div pour les boutons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
  

    // Parcourir l'ensemble Set et créer un bouton pour chaque élément unique
    monSet.forEach(categorie => {
        const button = document.createElement('button');
        button.textContent = categorie;
        // Ajouter un écouteur d'événements pour chaque bouton qui va permettre de filtrer les éléments
        
        button.addEventListener('click', ()=> {

            filtrer_images(categorie,data);
        
        });
        father.appendChild(button);
    });}
});





 // Fonction qui va filtrer les images en fonction de la catégorie 
function filtrer_images(categorie,data){
     //si la categorie du bouton est égale a Objets alors on affiche les images qui ont la categorie Objets
        const father = document.querySelector('.gallery');
        //vider
        father.innerHTML = "";
        data.forEach(element => {
            if(element.category.name === categorie || categorie === "Tous"){
                const figure = document.createElement('figure');
                father.appendChild(figure);
                const img = document.createElement('img');
                figure.appendChild(img);
                img.src = element.imageUrl; 
                const figcaption = document.createElement('figcaption');
                figure.appendChild(figcaption);
                figcaption.textContent = element.title; 
            }

        });
 
                
}



async function afficherPhotosModale() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    const photoGalerie = document.querySelector('.photo_galerie');
   photoGalerie.innerHTML = '';  // supprimer photos existantes 

    data.forEach(element => {
   

       /* const img = document.createElement('img')
        photoGalerie.appendChild(img);
        img.src = element.imageUrl;*/
         
  // Créer un conteneur pour l'image et l'icône
  const container = document.createElement('div');
  container.classList.add('photo_container'); // Ajouter une classe pour le conteneur si nécessaire

  const img = document.createElement('img');
  img.src = element.imageUrl;
  container.appendChild(img);

//Ajouter un arrire plan noir a l'icone de corbeille    
const arriere_plan_icone_corbeille=document.createElement('div')
arriere_plan_icone_corbeille.classList.add('arriere_plan_icone_corbeille')
container.appendChild(arriere_plan_icone_corbeille)

  // Ajouter l'icone corbeille
  const icone = document.createElement('i');
  icone.classList.add('fa-regular', 'fa-trash-can','corbeille_icone');
  arriere_plan_icone_corbeille.appendChild(icone)
  //container.appendChild(icone);
 
 // Ajouter un gestionnaire d'événements pour supprimer l'image
 icone.addEventListener('click', async () => {
    // Récupérer le token à partir du localStorage
    const token = localStorage.getItem('token');
    console.log('test')
    console.log(token)
    if (token) {
        console.log(element.id)
        const deleteResponse = await fetch(`http://localhost:5678/api/works/${element.id}`, {
     
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (deleteResponse.ok) {
            // Supprimer le conteneur de l'interface utilisateur dont element a pour id 
            container.remove();
            
        } 
    } 
});



  photoGalerie.appendChild(container);



    });
}

document.addEventListener('DOMContentLoaded', function () {
   /* Use JavaScript to turn on and off the overlay effect:
    https://www.w3schools.com/howto/howto_css_overlay.asp*/
 //const boutonEdition = document.querySelector('.fa-regular.fa-pen-to-square.btn_modifier');
 const boutonEdition = document.querySelector('.btn_modifier');


 //   const boutonEdition = document.querySelector('.fa-regular fa-pen-to-square');
    const modale = document.getElementById('modale');
    const boutonFermer = document.querySelector('.bouton_fermer');

    boutonEdition.addEventListener('click', function () {
        /*
        w3 school 
        function on() {document.getElementById("overlay").style.display = "block";}*/ 
        modale.style.display = 'block';
        overlay.style.display = 'block';
        afficherPhotosModale();
    });

    boutonFermer.addEventListener('click', function () {
        modale.style.display = 'none';
        overlay.style.display = 'none';
        //On rappel la fonction afficherPhotos() car elle fait la maj au niveau Backend afin de supprimer les photos sur la page d'accueil 
        afficherPhotos();

    });

    afficherPhotos();
});






//new

document.addEventListener('DOMContentLoaded', function () {
    const boutonAjouter = document.getElementById('bouton_ajouter');
    const modale = document.getElementById('modale2');
    const overlay = document.getElementById('overlay');
    const boutonFermer = document.querySelector('.bouton_fermer2');
    const photoGalerie = document.querySelector('.photo_galerie');
    const valider_btn=document.querySelector('.valider_btn');
    const modale1=document.getElementById('modale');

    boutonAjouter.addEventListener('click', function (event) {
     //   event.preventDefault(); // Empêche toute action par défaut du bouton, comme soumettre un formulaire
        console.log('CLique sur la modale 2')
       modale1.style.display = 'none';
        modale.style.display = 'block';
      //  overlay.style.display = 'block';
     
    });

    boutonFermer.addEventListener('click', function () {
        modale.style.display = 'none';
          modale1.style.display = 'none';
        overlay.style.display = 'none';
    });

  /*  overlay.addEventListener('click', function () {
        modale.style.display = 'none';
        overlay.style.display = 'none';
    });
*/

document.getElementById('ajouter_photo').addEventListener('click', function(event) {
    event.preventDefault() // pour ne pas recharger la page
    console.log("test")
    document.getElementById('telecharger_image_input').click();
});


//Ici ce block de code permet de previsualiser l'image avant de la telecharger
//L'événement 'change' est déclenché lorsque la valeur de l'élément sélectionné change, par exemple, lorsqu'un utilisateur sélectionne un fichier dans un champ de type fichier.
document.getElementById('telecharger_image_input').addEventListener('change', function(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('image_previsualiser');
        output.src = reader.result;
        output.style.display = 'block'; // Afficher l'image
    };
    reader.readAsDataURL(event.target.files[0]);
});

//new

   valider_btn.addEventListener('click', async (event)=> {
   
// Ajouter 
//new

        event.preventDefault() // pour ne pas recharger la page
        console.log('CLique sur le bouton valider')

        const photo = document.getElementById('telecharger_image_input').files[0];
        console.log(photo)
        const titre = document.getElementById('ajouter_titre').value;
        const categorie = document.getElementById('ajouter_categorie').value;

        const formData = new FormData();
        formData.append('image', photo);
        formData.append('title', titre);
        formData.append('category',categorie);
        // Récupérer le token à partir du localStorage
    // Récupérer le token à partir du localStorage
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` 
        },
        body: formData
    });
    //On fait disparaitre la modale 2
 modale.style.display = 'none';
afficherPhotos()
//Actualiser la modale 1 et retirer l'overlay
afficherPhotosModale()
overlay.style.display = 'none';
    });
});

//Redirection vers la modale 1

document.addEventListener('DOMContentLoaded', function() {

    const boutonRedirection=document.getElementById('redirection_vers_modale1')
    boutonRedirection.addEventListener('click', function (event) {
        console.log('Test redirection vers modale 1-2')
        const modale2 = document.getElementById('modale2');
    const modale1=document.getElementById('modale');
        modale2.style.display = 'none';
        modale1.style.display = 'block';
        
       });

});



//Le menu déroulant de la modale 2 
document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    const token = localStorage.getItem('token');
    if(token){
        return;
    }
    else{
    const tableau_categorie = data.map(element => element.category.name);
    const monSet = new Set(["Tous",...tableau_categorie]); // Création d'un ensemble Set à partir du tableau
    console.log("MON Set")
    console.log(monSet)
    //const father = document.querySelector('#portfolio');
   const father = document.querySelector('#containeur_bouton');
    // Creer un container div pour les boutons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
  

    // Parcourir l'ensemble Set et créer un bouton pour chaque élément unique
    monSet.forEach(categorie => {
        const button = document.createElement('button');
        button.textContent = categorie;
        // Ajouter un écouteur d'événements pour chaque bouton qui va permettre de filtrer les éléments
        
        button.addEventListener('click', ()=> {

            filtrer_images(categorie,data);
        
        });
        father.appendChild(button);
    });}
});


//Le menu deroulant des categorie dans la modale 2 est génére dynamiquement

document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    const token = localStorage.getItem('token');
    console.log("ici")
    console.log(data)
    if(token){
     //   const tableau_categorie = data.map(element => element.category.name);
   // const monSet = new Set(["Tous",...tableau_categorie]); 
  //  console.log("MON Set")
   // console.log(monSet)
   const father = document.querySelector('#ajouter_categorie');
 //Creer la premiere option de la liste deroulante
    const premiere_option_liste = document.createElement('option');
    premiere_option_liste.textContent="Choisir une categorie";
    father.appendChild(premiere_option_liste);
  

    // Parcourir l'ensemble Set et créer une option pour chaque élément unique
    data.forEach(element => {
        console.log(element)
        const option = document.createElement('option');
        option.textContent = element.name;
        option.value=element.id
        // Ajouter un écouteur d'événements pour chaque bouton qui va permettre de filtrer les éléments
        father.appendChild(option);
  
    }
);

    }
    else{
        return;
    }
});
