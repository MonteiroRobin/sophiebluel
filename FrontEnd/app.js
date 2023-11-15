const categories = document.getElementById('categories');
const works = document.getElementById('works');



function buildWork(work){
    
    const card = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');

    image.src = work.imageUrl;
    image.setAttribute("alt", work.title);
    caption.innerHTML = work.title;

    card.appendChild(image);
    card.appendChild(caption);
    works.append(card);


}
(async function(){

    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json()
    console.log(works);
    for ( let work of works )
    {
        buildWork(work)
    }
})();


function buildCategory(category){

    const button = document.createElement('button');
    button.textContent = category.name
    button.classList.add('btn')
    categories.appendChild(button)
}

(async function(){
  
    const response2 = await fetch('http://localhost:5678/api/categories')
    const categories = await response2.json()

  

    console.log(categories);
    for ( let category of categories )
    {
        buildCategory(category)
    }
})();


//

