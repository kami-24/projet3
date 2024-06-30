/*

fetch("http://localhost:5678/api/works")
    .then(response => {
        const repp=  response.json();
        console.log(repp);
//create a div element beside the h2 element named "Mes Projets"


        const div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = "Mes Projets";
//create a figure element for each photo
        const figure = document.createElement('figure');
        div.appendChild(figure);
        figure.innerHTML = "figure";
// in each figure element, create an img element with the src attribute set to the photo URL
        const img = document.createElement('img');
        figure.appendChild(img);
        img.src = "http://localhost:5678/api/works";
//create a figcaption element for each photo    
        const figcaption = document.createElement('figcaption');
        figure.appendChild(figcaption);
        figcaption.innerHTML = "figcaption";

    })

*/



/*

    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        // Create a div element beside the h2 element named "Mes Projets"
        const div = document.createElement('div');
        document.getElementById('portfolio').appendChild(div);
        div.innerHTML = "<h2>Mes Projets</h2>";

        // Iterate over each photo in the data
        data.forEach(photo => {
            // Create a figure element for each photo
            const figure = document.createElement('figure');
            div.appendChild(figure);

            // Create an img element with the src attribute set to the photo URL
            const img = document.createElement('img');
            figure.appendChild(img);
            img.src = photo.imageUrl; // Accessing the imageUrl property

            // Create a figcaption element for each photo
            const figcaption = document.createElement('figcaption');
            figure.appendChild(figcaption);
            figcaption.innerHTML = photo.title; // Assuming the title is stored in the 'title' property
        });
    })
    .catch(error => console.error('Error fetching data:', error));*/

    //on utilise les promises pour gérer les requêtes asynchrones
    //fetch est une fonction qui permet de faire des requêtes http
    //on attend que l’opération asynchrone se termine pour reprendre l’exécution du code
    //fetch retourne une promise
    //on utilise then pour récupérer la réponse de la requête
    //Le script continuera après avoir recu la réponse


  /*  const reponse = await fetch("http://localhost:5678/api/works");
    const avis = await reponse.json();
   */
   /* fetch("http://localhost:5678/api/works")

    //La réponse de l’API prend la forme d’une chaîne de caractères au format JSON. Nous devons donc désérialiser ce JSON, c’est-à-dire reconstruire les données décrites par la chaîne de caractères dans la mémoire de l’ordinateur.
    //Pour y parvenir, nous rajoutons un appel à la fonction JSON sur l’objet reponse. Il faut également utiliser le mot clé await, car cette opération est aussi asynchrone :
   .then(response => response.json())
   .then(data  => {
       console.log(data);
    })*/
/*
    fetch("http://localhost:5678/api/works")

    //La réponse de l’API prend la forme d’une chaîne de caractères au format JSON. Nous devons donc désérialiser ce JSON, c’est-à-dire reconstruire les données décrites par la chaîne de caractères dans la mémoire de l’ordinateur.
    //Pour y parvenir, nous rajoutons un appel à la fonction JSON sur l’objet reponse. Il faut également utiliser le mot clé await, car cette opération est aussi asynchrone :
    .then(response => response.json())
    //La constante reponse contient désormais une liste d’objets
    .then(data => {
    //Il ne nous reste plus qu’à générer des éléments grâce aux fonctions createElement et appendChild
        // Get the gallery container
        //querySelector() renvoie le premier élément qui correspond à un ou plusieurs sélecteurs CSS spécifiés dans la chaîne de caractères
        const gallery = document.querySelector('.gallery');

        // Iterate over each photo in the data
        data.forEach(photo => {
            // Create a figure element for each photo
            const figure = document.createElement('figure');
            gallery.appendChild(figure);

            // Create an img element with the src attribute set to the photo URL
            const img = document.createElement('img');
            figure.appendChild(img);
            img.src = photo.imageUrl; // Accessing the imageUrl property

            // Create a figcaption element for each photo
            const figcaption = document.createElement('figcaption');
            figure.appendChild(figcaption);
            figcaption.textContent = photo.title; // Assuming the title is stored in the 'title' property
        });
    })
   */