//Récupération des éléments du DOM
const categories = document.getElementById('categories');
const works = document.getElementById('works');


//"construction" des cartes avec données de l'API
function buildWork(work) {

    //création de chaque éléments
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

//fonction asynchrone pour récupérer et afficher les données de l'API -images-
(async function () {

    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json() //convertit les données au format JSON ,il attend la fin de la conversion pour continuer
    console.log(works);


    for (let work of works) {
        buildWork(work)
    }
})();



//function des boutons pour les filtres
function buildCategory(category) {
    //création des éléments
    const button = document.createElement('button');
    button.textContent = category.name
    button.classList.add('btn')
    //button est ajouter en tant qu'enfant de categories
    categories.appendChild(button)
}

//fonction asynchrone pour récupérer et afficher les données de l'API -filtres-
(async function () {

    const response2 = await fetch('http://localhost:5678/api/categories')
    const categories = await response2.json()//données -> JSON = objet utilisable ( JavaScript Objet Notation )



    console.log(categories);


    //boucle pour construire un bouton pour chaque catégories
    for (let category of categories) {
        buildCategory(category)
    }
})();


//

