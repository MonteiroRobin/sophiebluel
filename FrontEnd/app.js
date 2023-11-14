
const works = document.getElementById('works');

function buildWork(){
    
    const card = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');

    image.src = "aaa";
image.setAttribute("alt", "de la photo");

caption.innerHTML = "Titre de la photo";

    card.appendChild(image);
    card.appendChild(caption);
    works.append(card);

}

buildWork()




(async function(){
     
     
    const response = await fetch('http://localhost:5678/api/works')
    const data = await response.json()
    
console.log(data)
})();





