// Page de connexion

const form = document.getElementById('login').querySelector('form');

form.addEventListener('submit', function (event) {

    // Permet d'empêcher le rechargement de la page 
    event.preventDefault();

    // Récupère les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Requête POST à l'API
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Convertit un objet JavaScript en une chaîne JSON
        body: JSON.stringify({ email, password })
    })

        // Convertit la réponse JSON en un objet JavaScript
        .then(response => response.json())

        .then(data => {
            console.log("Réponse de l'API:", data); // Ajout d'un console.log pour afficher la réponse de l'API

            // On vérifie si userId et token sont présents dans l'objet data
            if (data.userId && data.token) {

                // Stocke l'information de connexion dans la session
                window.sessionStorage.loged = true;

                // Redirige vers la page d'accueil
                window.location.href = './index.html';
            } else {
                // Connexion échouée, affiche un message d'erreur
                alert('Erreur dans l\'identifiant ou le mot de passe');
            }
        })
        .catch(error => {
            // Si une erreur survient lors de la requête fetch
            console.error('Erreur de requête:', error);
        });
});
