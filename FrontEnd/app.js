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
            if (work.category.id === category) {
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



    //button est ajouter en tant qu'enfant de categories
    categories.appendChild(button)


    //ecouteur d'évènement pour filtrés par l'id

    button.addEventListener('click', function () {


        //on récupère les éléments qui ont la class .btn
        const buttons = document.querySelectorAll('.btn');

        //On boucle dessus pour itérer sur chaque éléments
        for (let btn of buttons) {
            btn.classList.remove('active');//on retire la class active
        }

        //ajout de la classe active sur les filtres
        button.classList.add('active');

        filterWorks(category.id);




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





//Page de connexion

