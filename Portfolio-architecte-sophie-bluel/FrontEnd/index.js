async function afficherTravauxGallerie() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  const father = document.querySelector(".gallery");
  // Faire une suppression de tout contenu
  father.innerHTML = "";
  data.forEach((element) => {
    const figure = document.createElement("figure");
    father.appendChild(figure);

    const img = document.createElement("img");
    figure.appendChild(img);
    img.src = element.imageUrl;

    const figcaption = document.createElement("figcaption");
    figure.appendChild(figcaption);
    figcaption.textContent = element.title;
  });

  //Afficher le mode edition si le token est présent, on verifie l'etat de la connexion
  const token = localStorage.getItem("token");
  if (token) {
    document.querySelector(".mode_edition").style.display = "block";
  }
}

//Le bouton modifier doit etre visible si le token existe
// Le bouton logout doit etre present si le token existe sinon login
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  var boutonModifier = document.getElementById("btn_modifier");
  if (token) {
    boutonModifier.style.display = "block";
    document.getElementById("login_logout").textContent = "logout";
  } else {
    boutonModifier.style.display = "none";
    document.getElementById("login_logout").textContent = "login";
  }
});

//Quand on clique sur le bouton logout on est rediriger vers la page home_page.html
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  var boutonModifier = document.getElementById("login_logout");
  if (token) {
    boutonModifier.addEventListener("click", () => {
      // Supprime le token du localStorage

      localStorage.removeItem("token");
      window.location.href = "home_page.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  const token = localStorage.getItem("token");
  if (token) {
    return;
  } else {
    const tableauCategorie = data.map((element) => element.category.name);
    const monSet = new Set(["Tous", ...tableauCategorie]); // Création d'un ensemble Set à partir du tableau

    const father = document.querySelector("#containeur_bouton");
    // Creer un container div pour les boutons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Parcourir l'ensemble Set et créer un bouton pour chaque élément unique
    monSet.forEach((categorie) => {
      const button = document.createElement("button");
      button.textContent = categorie;
      // Ajouter un écouteur d'événements pour chaque bouton qui va permettre de filtrer les éléments

      button.addEventListener("click", () => {
        filtrerTravauxGallerie(categorie, data);
      });
      father.appendChild(button);
    });
  }
});

// Fonction qui va filtrer les images en fonction de la catégorie
function filtrerTravauxGallerie(categorie, data) {
  //si la categorie du bouton est égale a Objets alors on affiche les images qui ont la categorie Objets
  const father = document.querySelector(".gallery");
  //vider
  father.innerHTML = "";
  data.forEach((element) => {
    if (element.category.name === categorie || categorie === "Tous") {
      const figure = document.createElement("figure");
      father.appendChild(figure);
      const img = document.createElement("img");
      figure.appendChild(img);
      img.src = element.imageUrl;
      const figcaption = document.createElement("figcaption");
      figure.appendChild(figcaption);
      figcaption.textContent = element.title;
    }
  });
}

async function afficherTravauxModale() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();

  const photoGalerie = document.querySelector(".photo_galerie");
  photoGalerie.innerHTML = ""; // supprimer photos existantes

  data.forEach((element) => {
    // Créer un conteneur pour l'image et l'icône
    const container = document.createElement("div");
    container.classList.add("photo_container"); // Ajouter une classe pour le conteneur si nécessaire

    const img = document.createElement("img");
    img.src = element.imageUrl;
    container.appendChild(img);

    //Ajouter un arrire plan noir a l'icone de corbeille
    const arrierePlanIconeCorbeille = document.createElement("div");
    arrierePlanIconeCorbeille.classList.add("arriere_plan_icone_corbeille");
    container.appendChild(arrierePlanIconeCorbeille);

    // Ajouter l'icone corbeille
    const icone = document.createElement("i");
    icone.classList.add("fa-regular", "fa-trash-can", "corbeille_icone");
    arrierePlanIconeCorbeille.appendChild(icone);
    //container.appendChild(icone);

    // Ajouter un gestionnaire d'événements pour supprimer l'image
    icone.addEventListener("click", async () => {
      // Récupérer le token à partir du localStorage
      const token = localStorage.getItem("token");

      if (token) {
        const deleteResponse = await fetch(
          `http://localhost:5678/api/works/${element.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (deleteResponse.ok) {
          // Supprimer le conteneur de l'interface utilisateur dont element a pour id
          container.remove();
        }
      }
    });

    photoGalerie.appendChild(container);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const boutonEdition = document.querySelector(".btn_modifier");

  const modale = document.getElementById("modale");
  const boutonFermer = document.querySelector(".bouton_fermer");

  boutonEdition.addEventListener("click", function () {
    modale.style.display = "block";
    overlay.style.display = "block";
    afficherTravauxModale();
  });

  boutonFermer.addEventListener("click", function () {
    modale.style.display = "none";
    overlay.style.display = "none";
    //On rappel la fonction afficherTravauxGallerie() car elle fait la maj au niveau Backend afin de supprimer les photos sur la page d'accueil
    afficherTravauxGallerie();
  });

  afficherTravauxGallerie();
});

document.addEventListener("DOMContentLoaded", function () {
  const boutonAjouter = document.getElementById("bouton_ajouter");
  const modale = document.getElementById("modale2");
  const overlay = document.getElementById("overlay");
  const boutonFermer = document.querySelector(".bouton_fermer2");
  const photoGalerie = document.querySelector(".photo_galerie");
  const validerBtn = document.querySelector(".valider_btn");
  const modale1 = document.getElementById("modale");

  boutonAjouter.addEventListener("click", function (event) {
    modale1.style.display = "none";
    modale.style.display = "block";
  });

  boutonFermer.addEventListener("click", function () {
    modale.style.display = "none";
    modale1.style.display = "none";
    overlay.style.display = "none";
  });

  document
    .getElementById("ajouter_photo")
    .addEventListener("click", function (event) {
      event.preventDefault(); // pour ne pas recharger la page

      document.getElementById("telecharger_image_input").click();
    });

  //Ici ce block de code permet de previsualiser l'image avant de la telecharger
  //L'événement 'change' est déclenché lorsque la valeur de l'élément sélectionné change, par exemple, lorsqu'un utilisateur sélectionne un fichier dans un champ de type fichier.
  document
    .getElementById("telecharger_image_input")
    .addEventListener("change", function (event) {
      var reader = new FileReader();
      reader.onload = function () {
        var output = document.getElementById("image_previsualiser");
        var imgDefaut = document.getElementById("image_par_defaut");
        var btnAjouterPhoto = document.getElementById("ajouter_photo");
        output.src = reader.result;
        output.style.display = "block"; // Afficher l'image
        imgDefaut.style.display = "none";
        btnAjouterPhoto.style.display = "none";
      };
      reader.readAsDataURL(event.target.files[0]);
    });

  const ajouterTitre = document.getElementById("ajouter_titre");
  ajouterTitre.addEventListener("input", (event) => {
    if (
      document.getElementById("image_previsualiser").src !== "" &&
      document.getElementById("ajouter_titre").value !== "" &&
      document.getElementById("ajouter_categorie").value !== ""
    ) {
      document.getElementById("valider_btn").style.backgroundColor = "green";
    }
  });

  validerBtn.addEventListener("click", async (event) => {
    //Si image_previsualiser ou ajouterTitre ou ajouter_categorie est vidse alors le bouton valider_btn doit etre desactivé
    if (
      document.getElementById("image_previsualiser").src === "" ||
      document.getElementById("ajouter_titre").value === "" ||
      document.getElementById("ajouter_categorie").value === ""
    ) {
      return console.log("Veuillez remplir tous les champs");
    } else {
      event.preventDefault(); // pour ne pas recharger la page

      const photo = document.getElementById("telecharger_image_input").files[0];

      const titre = document.getElementById("ajouter_titre").value;
      const categorie = document.getElementById("ajouter_categorie").value;

      const formData = new FormData();
      formData.append("image", photo);
      formData.append("title", titre);
      formData.append("category", categorie);
      // Récupérer le token à partir du localStorage
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      //on reinitialise les 3 parametres

      document.getElementById("image_previsualiser").src = "";
      document.getElementById("image_par_defaut").style.display = "block";
      document.getElementById("ajouter_photo").style.display = "block";
      document.getElementById("ajouter_titre").value = "";
      document.getElementById("ajouter_categorie").value = "";
      //On fait disparaitre la modale 2
      modale.style.display = "none";
      afficherTravauxGallerie();
      //Actualiser la modale 1
      afficherTravauxModale();
      const modale2 = document.getElementById("modale2");
      const modale1 = document.getElementById("modale");
      modale2.style.display = "none";
      modale1.style.display = "block";
    }
  });
});

//Redirection vers la modale 1
document.addEventListener("DOMContentLoaded", function () {
  const boutonRedirection = document.getElementById("redirection_vers_modale1");
  boutonRedirection.addEventListener("click", function (event) {
    const modale2 = document.getElementById("modale2");
    const modale1 = document.getElementById("modale");
    modale2.style.display = "none";
    modale1.style.display = "block";
  });
});

//Le menu deroulant des categorie dans la modale 2 est génére dynamiquement
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json();
  const token = localStorage.getItem("token");

  if (token) {
    const father = document.querySelector("#ajouter_categorie");
    //Creer la premiere option de la liste deroulante
    const premiereOptionListe = document.createElement("option");
    // premiereOptionListe.textContent = "Choisir une categorie";
    father.appendChild(premiereOptionListe);

    // Parcourir l'ensemble Set et créer une option pour chaque élément unique
    data.forEach((element) => {
      const option = document.createElement("option");
      option.textContent = element.name;
      option.value = element.id;
      // Ajouter un écouteur d'événements pour chaque bouton qui va permettre de filtrer les éléments
      father.appendChild(option);
    });
  } else {
    return;
  }
});
