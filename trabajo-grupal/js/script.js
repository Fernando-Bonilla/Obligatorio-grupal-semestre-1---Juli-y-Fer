document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];   

    const GAMES = [
        { id: 1, name: 'Far Cry 6', price: 10, description: "Un juego emocionante lleno de aventuras.", imgSrc: "img/far_cry_6.jpg", category: "Accion", clasificacion: "E"},
        { id: 2, name: 'Far Cry 5', price: 15, description: "Mundo abierto lleno de acción.", imgSrc: "img/far_cry_5.jpg", category: "Accion", clasificacion: "E 10+"},
        { id: 3, name: 'Watch Dogs', price: 20, description: "Mundo genuinamente lleno de codigo.", imgSrc: "img/watch.jpg", category: "Accion", clasificacion: "T"},
        { id: 4, name: 'Star Wars', price: 12, description: "Aventura épica en mundos místico.", imgSrc: "img/star-wars.jpg", category: "Estrategia", clasificacion: "M" },
        { id: 5, name: 'CSGO 2', price: 18, description: "Mejor juego de disparos del mundo.", imgSrc: "img/counterstrike_2.jpg", category: "Shooter", clasificacion: "A" },
        { id: 6, name: 'CS 1.6', price: 22, description: "Disparos en primera persona multijugador.", imgSrc: "img/cs1.6.jpg", category: "Shooter", clasificacion: "A" },
        { id: 7, name: 'DOOM', price: 25, description: "Acción trepidante y combates espectaculares.", imgSrc: "img/doom.jpg", category: "Estrategia", clasificacion: "" },
        { id: 8, name: 'Sims 4', price: 16, description: "Juego de simulación muy realista en personas.", imgSrc: "img/sims4.jpg", category: "Estrategia", clasificacion: "" },
        { id: 9, name: 'ARK', price: 19, description: "Mundo lleno de misterios y aventuras inolvidables.", imgSrc: "img/ark.jpg", category: "Estrategia", clasificacion: "" },
        { id: 10, name: 'Assetto Corsa', price: 14, description: "Juego de carreras con vehículos personalizables.", imgSrc: "img/asseto.jpg", category: "Estrategia", clasificacion: "" },
        { id: 11, name: 'ZUMA', price: 8, description: "Puzzle adictivo con desafíos diarios.", imgSrc: "img/zuma.jpg", category: "Estrategia", clasificacion: "" },
        { id: 12, name: 'FIFA 24', price: 24, description: "Simulación deportiva con los mejores equipos del mundo.", imgSrc: "img/fifa24.jpg", category: "Estrategia", clasificacion: "" },
        { id: 13, name: 'Phasmophobia', price: 20, description: "Juego de terror que te mantendrá en suspenso.", imgSrc: "img/phasmophobia.jpg", category: "Estrategia", clasificacion: "" },
        { id: 14, name: 'Cities Skylines', price: 17, description: "Construcción de ciudades con infinitas posibilidades.", imgSrc: "img/cities-skylines.jpg", category: "Estrategia", clasificacion: "" },
        { id: 15, name: 'Undawn', price: 23, description: "Supervivencia en un mundo postapocalíptico.", imgSrc: "img/undawn.jpg", category: "Estrategia", clasificacion: ""},
        { id: 16, name: 'WOW', price: 26, description: "Juego de rol multijugador en línea.", imgSrc: "img/wow.jpg", category: "Estrategia", clasificacion: "M"},
        { id: 17, name: 'GTA 5', price: 13, description: "Mundo abierto con infinitas cosas para hacer.", imgSrc: "img/gta5.jpg", category: "Estrategia", clasificacion: "" },
        { id: 18, name: 'Guitar Hero 3', price: 11, description: "Juego de música con desafíos emocionantes.", imgSrc: "img/guitarhero.jpg", category: "Musica", clasificacion: "" },
        { id: 19, name: 'RUST', price: 9, description: "Supervivencia realista lleno de peligros.", imgSrc: "img/rust.jpg", category: "Estrategia", clasificacion: "" },
        { id: 20, name: 'CALL OF DUTY', price: 18, description: "Disparos en primera persona.", imgSrc: "img/Black_Ops_2.png", category: "Estrategia", clasificacion: "" },
    ];

    function showGamesList(gamesData) {  

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
            gamePrice.textContent = `US$ ${gamesData[i].price}`;
    
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
        for(game of gamesList) {
            if(singleCategories.includes(game.category) == false) {
                singleCategories.push(game.category);
            }
                     
        }
        return singleCategories;
    }

    function addCategories(categoryList){
        let ul = document.getElementById('category-list-container');
        for(category of categoryList) {
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

/*let GAMES = [
    { id: 1, name: 'Far Cry 6', price: 10, description: "tiro y tiro", imgSrc: "img/far_cry_6.jpg", category: "Accion", clasificacion: "E"},
    { id: 2, name: 'Far Cry 5', price: 15, description: "tiro y tiro", imgSrc: "img/far_cry_5.jpg", category: "Accion", clasificacion: "E 10+"},
    { id: 3, name: 'Watch Dogs', price: 20, description: "tiro y tiro", imgSrc: "img/watch.jpg", category: "Accion", clasificacion: "T"},
    { id: 4, name: 'Star Wars', price: 12, descripcion: "tiro y tiro", imgSrc: "img/star-wars.jpg", category: "Estrategia", clasificacion: "M" },
    { id: 5, name: 'CSGO 2', price: 18, descripcion: "tiro y tiro", imgSrc: "img/counterstrike_2.jpg", category: "Shooter", clasificacion: "A" },
    { id: 6, name: 'CS 1.6', price: 22 },
    { id: 7, name: 'DOOM', price: 25 },
    { id: 8, name: 'Sims 4', price: 16 },
    { id: 9, name: 'ARK', price: 19 },
    { id: 10, name: 'Assetto Corsa', price: 14 },
    { id: 11, name: 'ZUMA', price: 8 },
    { id: 12, name: 'FIFA 24', price: 24 },
    { id: 13, name: 'Phasmophobia', price: 20 },
    { id: 14, name: 'Cities Skylines', price: 17 },
    { id: 15, name: 'Undawn', price: 23 },
    { id: 16, name: 'WOW', price: 26 },
    { id: 17, name: 'GTA 5', price: 13 },
    { id: 18, name: 'Guitar Hero 3', price: 11 },
    { id: 19, name: 'RUST', price: 9 },
    { id: 20, name: 'Zuma', price: 18, description: "Un juegaso", imgSrc: "img/zuma.jpg" },
];*/










