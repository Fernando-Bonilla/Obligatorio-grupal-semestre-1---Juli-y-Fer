import {GAMESLIST} from './preload.js';

document.addEventListener('DOMContentLoaded', () => {          
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let GAMES = JSON.parse(localStorage.getItem('JUEGOS')) || []; // usamos el nombre GAMES porque movimos esta variable a un archivo separado, y en todas las funciones estabamos usando este nombre de variable   
    console.log(GAMES)
    if(GAMES.length == 0) {
        GAMES = GAMESLIST
        localStorage.setItem('JUEGOS', JSON.stringify(GAMES))
    }    

    function showGamesList(gamesData) {  

        //let gamesData = JSON.parse(localStorage.getItem('GAMES'))
        let gamesList = document.getElementById("card-template-container");       
        gamesList.innerHTML = "";   
        
        for(let i = 0; i < gamesData.length; i++) {
            let divContainer = document.createElement('div');
            divContainer.className = 'game';
            divContainer.setAttribute('data-id', gamesData[i].id);

            let img = document.createElement('img');
            img.src = gamesData[i].imgSrc;
            img.alt = 'Juego ${gamesData[i].id}';
            
            let gameTitle = document.createElement('h2');
            gameTitle.textContent = gamesData[i].name;
    
            let gameDescription = document.createElement('p');
            gameDescription.textContent = gamesData[i].description;
    
            let gamePrice = document.createElement('p');
            gamePrice.className = 'price';
            gamePrice.innerHTML = `US$ ${gamesData[i].price}`;
    
            let addCartButton = document.createElement('button');
            addCartButton.className = 'add-to-cart';
            addCartButton.textContent = 'Agregar al carrito';
            addCartButton.addEventListener('click', (event) => {
                let gameId = parseInt(event.target.parentElement.dataset.id);
                let game = GAMES.find(game => game.id === gameId);
                cart.push(game);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${game.name} agregado al carrito.`);

            })
    
            divContainer.appendChild(img);
            divContainer.appendChild(gameTitle);
            divContainer.appendChild(gameDescription);
            divContainer.appendChild(gamePrice);
            divContainer.appendChild(addCartButton);
            gamesList.appendChild(divContainer);
        }               
    }

    showGamesList(GAMES);
    addCategories(filterCategories(GAMES));
    addEventOnCategoryItem()

    function filterCategories(gamesList) {
        //crea un array filtrando categorias repetidas
        let singleCategories = [];
        for(let game of gamesList) {
            if(singleCategories.includes(game.category) == false) {
                singleCategories.push(game.category);
            }
                     
        }
        return singleCategories;
    }

    function addCategories(categoryList){
        let ul = document.getElementById('category-list-container');
        for(let category of categoryList) {
            let li = document.createElement('li');
            li.classList.add('category-item');
            let a = document.createElement('a');
            
            a.innerHTML = category;
            li.appendChild(a);
            ul.appendChild(li);
            

        }
    }
    
    function addEventOnCategoryItem(){
        let allCategoryItems = document.querySelectorAll('.category-item');
        allCategoryItems.forEach((item) => item.addEventListener('click', function(event){
            let clickedCategoryItemText = event.target.innerHTML; 

            if(clickedCategoryItemText === 'Todas las categorias') {
                showGamesList(GAMES);
            }else {
                let gamesListCat = GAMES.filter(game => game.category === clickedCategoryItemText); 
                showGamesList(gamesListCat); 
            }        

        }))
    }

    
}); 