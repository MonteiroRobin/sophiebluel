//Récupération des éléments du DOM

let allWorks = [];

//"construction" des cartes avec données de l'API
function buildWork(work) {
    //création de chaque éléments
    const works = document.getElementById('works');
    const card = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');

    //choix de la source , l'alt et le titre des images
    image.src = work.imageUrl;
    image.setAttribute("alt", work.title);
    caption.innerHTML = work.title;

    //image et caption deviennent enfants de card 
    card.appendChild(image);
    card.appendChild(caption);

    //intègre card en tant qu'enfant de la div works
    works.append(card);

}



function filterWorks(category) {
    const works = document.getElementById('works');
    works.innerHTML = ''; // Retire les works qui sont affichés

    if (category === 'all') {
        // Boucle pour 'tous' les travaux 
        for (let work of allWorks) {
            buildWork(work);
        }
    } else {
        // Boucle pour les travaux par id
        for (let work of allWorks) {
            if (work.category.id.toString() === category) {
                buildWork(work);
            }
        }
    }
}
//fonction asynchrone pour récupérer et afficher les données de l'API -images-
(async function () {

    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json() //convertit les données au format JSON ,il attend la fin de la conversion pour continuer
    console.log(works);

    allWorks = works;//je stock les données dans allWorks

    for (let work of works) {
        buildWork(work)
    }

})();



//function des boutons pour les filtres
function buildCategory(category) {
    const categories = document.getElementById('categories');

    //création des éléments
    const button = document.createElement('button');
    button.textContent = category.name
    button.classList.add('btn')

    // Ajout de l'attribut data-id au bouton
    button.setAttribute('data-id', category.id);

    //button est ajouter en tant qu'enfant de categories
    categories.appendChild(button)


    // Écouteur d'événement pour filtrer par l'id
    button.addEventListener('click', function () {

        // Récupération des éléments qui ont la classe .btn
        const buttons = document.querySelectorAll('.btn');

        // Boucle pour retirer la classe active de tous les boutons
        for (let btn of buttons) {
            btn.classList.remove('active');
        }

        // Ajout de la classe active sur le bouton cliqué
        button.classList.add('active');

        // Récupération de l'id de catégorie à partir de l'attribut data-id
        const categoryId = this.getAttribute('data-id');

        filterWorks(categoryId);
    });

}


// Bouton Tous
document.querySelector('.all').addEventListener('click', function () {

    const buttons = document.querySelectorAll('.btn');

    // On boucle pour la classe active de tous les boutons
    for (let btn of buttons) {
        btn.classList.remove('active');
    }

    // Ajoute la classe active sur le bouton "Tous"
    this.classList.add('active');

    // Filtre tous les travaux (sans filtrage par catégorie)
    filterWorks('all');
});


//fonction asynchrone pour récupérer et afficher les données de l'API -filtres-
(async function () {

    const response = await fetch('http://localhost:5678/api/categories')
    const categories = await response.json()//données -> JSON = objet utilisable ( JavaScript Objet Notation )

    console.log(categories);

    //boucle pour construire un bouton pour chaque catégories
    for (let category of categories) {
        buildCategory(category)
    }
})();





// Après connexion
const sb = JSON.parse(window.sessionStorage.sb);
const modify = document.querySelector(".modify-span");
const logout = document.querySelector("header nav .logout");
const filter = document.querySelector(".filter");
const edition = document.querySelector(".display-none");
const modalcontainer = document.querySelector(".modal-container");
const times = document.querySelector(".modal-container .fa-times");
const modalWorks = document.querySelector(".modal-works");


if (sb.logged === true) {

    edition.style.display = "flex"
    logout.textContent = "logout";
    modify.style.display = "inline";
    filter.style.display = "none";
    logout.addEventListener("click", () => {
        sb.logged = false;
        sb.token = null;
        window.sessionStorage.sb = JSON.stringify(sb);
    });

}





modify.addEventListener("click", () => {
    modalcontainer.style.display = "flex";
    displayWorksInModal();
    deleteContent();
});

times.addEventListener("click", () => {
    modalcontainer.style.display = "none";
});


modalcontainer.addEventListener("click", (e) => {
    console.log(e.target.className);
    if (e.target.className === "modal-container") {
        modalcontainer.style.display = "none";
    }
});

async function displayWorksInModal() {
    modalWorks.innerHTML = ""; // Nettoie le contenu de la modal

    allWorks.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work-item');
        workElement.dataset.id = work.id; // Ajoute l'ID du travail pour une utilisation dans la suppression

        const deleteIcon = document.createElement('span');
        deleteIcon.createElement = '<i class="fas fa-trash"></i>'; // Icône de poubelle
        deleteIcon.classList.add('delete-icon');
        // Ajoute un attribut de data-id pour reconnaître facilement quel travail supprimer
        deleteIcon.dataset.id = work.id;

        workElement.appendChild(deleteIcon);

        const image = document.createElement('img');
        image.src = work.imageUrl;
        image.classList.add('work-image');
        workElement.appendChild(image);

        modalWorks.appendChild(workElement);
    });


}

// Fonction pour attacher les événements de suppression aux icônes de poubelle
function deleteContent() {
    const deleteIcons = document.querySelectorAll(".modal-works .delete-icon");
    deleteIcons.forEach((icon) => {
        icon.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const deleteIcon = document.createElement('i');
            const workId = e.target.closest('.delete-icon').dataset.id;
            // Vérifiez que le token existe avant de faire la requête
            if (!sb.token) {
                console.error("Token d'authentification non trouvé ou non connecté.");
                return;
            }
            const init = {
                method: "DELETE",
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${sb.token}`, // Utiliser le token pour l'autorisation
                },
            };
            fetch(`http://localhost:5678/api/works/${workId}`, init)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Problème lors de la suppression');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Suppression réussie:", data);
                    // Vous pouvez également mettre à jour l'affichage ici si nécessaire
                })

        });
    });
}





// METHODE POUR POST
const postModal = document.querySelector('.post-modal');
const btnAddProject = document.getElementById('add-project-btn');
const modalRemoveWorks = document.querySelector('.modal-content');
const returnArrow = document.querySelector('.fa-arrow-left');
const formAddProject = document.querySelector('.form-add-project');
const imgDataForm = document.querySelector('#image-postform');
const imgToDisplay = document.querySelector('.image-from-input');
const titleDataForm = document.querySelector('#title-postform');
const categoryDataForm = document.querySelector('#category-postform');
const responsePostRequest = document.querySelector('.response-post-request');
const btnValidePostform = document.querySelector('input[type="submit"]');

// afficher et retirer modal
btnAddProject.addEventListener("click", function () {
    postModal.style.display = "block";
    modalRemoveWorks.classList.add("display-none");
});

returnArrow.addEventListener("click", function () {
    modalRemoveWorks.classList.remove("display-none");
    postModal.style.display = "none";
});

// Prévisualisation de l'image sélectionnée
imgDataForm.addEventListener('change', function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgToDisplay.src = e.target.result;
            imgToDisplay.classList.remove('display-none'); // Assurez-vous que cette classe permet d'afficher l'image
        }
        reader.readAsDataURL(this.files[0]);
    }
});


(async function () {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    // Sélectionnez le menu déroulant des catégories dans le formulaire
    const categorySelect = document.querySelector('#category-postform');

    // Ajoutez chaque catégorie comme option dans le menu déroulant
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; // Utilisez l'ID de la catégorie comme valeur
        option.textContent = category.name; // Le nom de la catégorie comme texte visible
        categorySelect.appendChild(option);
    });
})();

// Soumission du formulaire
formAddProject.addEventListener('submit', function (e) {
    e.preventDefault();

    //  FormData pour l'envoi
    var formData = new FormData();
    formData.append('image', imgDataForm.files[0]);
    formData.append('title', titleDataForm.value);
    formData.append('category', categoryDataForm.value);

    // Appel API pour envoyer les données
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${sb.token}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Traiter la réponse de l'API
            responsePostRequest.textContent = 'Projet ajouté avec succès';

            // Réinitialiser le formulaire et fermer la modal

            imgToDisplay.src = './assets/icons/image-regular.svg'; // Remettre l'image par défaut
            postModal.style.display = "none";
            modalRemoveWorks.classList.remove("display-none");
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
            responsePostRequest.textContent = 'Erreur lors de l\'ajout du projet';
        });
});
