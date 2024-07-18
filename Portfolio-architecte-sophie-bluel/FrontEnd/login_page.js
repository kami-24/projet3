//La requête pour envoyer les valeurs des entrees de mon formulaire de la page login_page.html
async function formulaire() {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.querySelector("#email").value,
      password: document.querySelector("#mot_passe").value,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);

    // Rediriger vers la page d'accueil
    window.location.href = "index.html";
  } else {
    // Afficher un message d'erreur
    alert("Erreur : le nom d'utilisateur ou le mot de passe est incorrect");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".formulaire")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      await formulaire();
    });
});
