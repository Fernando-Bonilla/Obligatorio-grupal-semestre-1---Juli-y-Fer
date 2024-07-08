import { Game } from "./classGame.js";

document.addEventListener('DOMContentLoaded', () => {  
    
    let arrayOfGames = JSON.parse(localStorage.getItem('JUEGOS'));
    //cada vez que hago el getItem en local storage tengo que volver a instanciar los objetos para poder acceder a sus atributos;
    arrayOfGames = arrayOfGames.map(gameData => new Game(
        gameData._id,
        gameData._name,
        gameData._price,
        gameData._description,
        gameData._imgSrc,
        gameData._category,
        gameData._clasificacion,
    )); 
    listGamesInTable(arrayOfGames);

    let gameForm = document.getElementById('gameForm');
    gameForm.addEventListener('submit', function(event) {
        //Evitamos el comportamiento por defecto del formulario con el preventDafault
        event.preventDefault();

        let hiddenInput = document.getElementById('input-with-id-game');
        if(hiddenInput.value === ""){
            createGame();
        }else{
            modifyGame(hiddenInput.value);
        }
    });

    function createGame() {                 
        
        let idGame = Math.max(...arrayOfGames.map(game => game.id)) + 1;         
        
        let nameGame = document.getElementById('formGroupExampleInput').value;
        let priceGame = parseFloat(document.getElementById('formGroupExampleInput2').value);              
        let descriptionGame = document.getElementById('formGroupExampleInput3').value;        
        let clasificationGame = document.getElementById('select-with-game-clasification').value;    
        let categoryGame = document.getElementById('formGroupExampleInput4').value;

        let imgSrcGame = document.getElementById('formFileCreateGame').value;        
        let imgNewPath = `img/${imgSrcGame.replace("C:\\fakepath\\", "")}`;   
        if(imgSrcGame == "") {
            imgNewPath = 'img/never.jpg';
        }     

        let game = new Game(idGame, nameGame, priceGame, descriptionGame, imgNewPath, categoryGame, clasificationGame);  
                
        arrayOfGames.push(game);                  
        localStorage.setItem('JUEGOS', JSON.stringify(arrayOfGames));
        alert('Juego creado');  
        listGamesInTable(arrayOfGames);  
        cleanAddGameFormInputs()     
    }  
    
    function listGamesInTable(games){
        let tableBody = document.getElementById('table-games-listed');
        tableBody.innerHTML = "";

        for(let game of games) {            
            
            let tr = document.createElement('tr');
            tr.classList.add('game-table-row'); 

            let tdInput = document.createElement('td');
            let input = document.createElement('input')
            input.classList.add('form-check-input');
            input.type = "radio";
            input.name = "flexRadioDefault"
            input.id = game.id;
            tdInput.appendChild(input);

            let tdName = document.createElement('td');
            tdName.innerHTML = game.name;
            
            let tdPrice = document.createElement('td');
            tdPrice.innerHTML = `US$ ${game.price}`;

            let tdCategory = document.createElement('td');
            tdCategory.innerHTML = game.category;

            let tdClasification = document.createElement('td');
            tdClasification.innerHTML = game.clasificacion;

            tr.appendChild(tdInput);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdCategory);
            tr.appendChild(tdClasification);

            tableBody.appendChild(tr);
            
        }

    }

    function cleanAddGameFormInputs() {

        document.getElementById('formGroupExampleInput').value = "";
        document.getElementById('formGroupExampleInput2').value = "";
        document.getElementById('formGroupExampleInput3').value = "";        
        document.getElementById('select-with-game-clasification').value = document.getElementById('select-with-game-clasification')[0].value;   
        document.getElementById('formGroupExampleInput4').value = "";
        document.getElementById('formFileCreateGame').value = "";  
        document.getElementById('input-with-id-game').value = "";            

    }

    let removeGameButton = document.getElementById('remove-game-button');
    removeGameButton.addEventListener('click', () => removeGame(getInputRadioCheckedId()));

    function getInputRadioCheckedId() {
        let listOfRadioCheck = document.querySelectorAll('.form-check-input'); 
           
        let inputRadioCheckedId;

        for(let radioCheck of listOfRadioCheck) {
            if(radioCheck.checked) {
                inputRadioCheckedId = radioCheck.id;
            }
        }
        
        return inputRadioCheckedId;
    }

    function removeGame(id) {
        let indexOfGame;

        for(let game of arrayOfGames) {
            if(game.id == id){
                indexOfGame = arrayOfGames.indexOf(game);

                if(confirm('Desea eliminar el juego seleccionado?'))
                    arrayOfGames.splice(indexOfGame, 1);
            }
        }  
        
        listGamesInTable(arrayOfGames);     
        localStorage.setItem('JUEGOS', JSON.stringify(arrayOfGames)); 
        cleanAddGameFormInputs();      
    }

    let searchBarGame = document.getElementById('bar-search-game')
    searchBarGame.addEventListener('keyup', searchGame);

    function searchGame(){                        
        let searchBarGameValue = document.getElementById('bar-search-game').value.toLowerCase();           
        
        if(searchBarGameValue != "") {            
            let gameWithCoincidence = arrayOfGames.filter((game) => {                        
                return game.name.toLowerCase().includes(searchBarGameValue) ||                     
                    game.price.toString().includes(searchBarGameValue) || 
                    game.category.includes(searchBarGameValue);
                 
            });
            listGamesInTable(gameWithCoincidence);
            
        }else {
            listGamesInTable(arrayOfGames);
        }           
        
    }      

    //Funcion que captura los datos del juego a modificar y los carga en los inputs correspondientes
    document.getElementById('modify-game').addEventListener('click', function() {
        const selectedGame = document.querySelector('input[name="flexRadioDefault"]:checked');        
                      
        let editingRow;        

        if (selectedGame) {
            let game = arrayOfGames.filter((game) => game.id == selectedGame.id);  
            editingRow = selectedGame.parentElement.parentElement; //aca capturamos la row entera, el input guardado en selected game, padre td, padre de td es la row
            const name = editingRow.cells[1].innerText;
            let price = parseFloat(editingRow.cells[2].innerHTML.slice(4)); //al capturar el valor en esta celda viene en formato string porque le agregas "US$", entonces capturamos el valor a partir del indice 4 que es donde comienza el numero                        
            const category = editingRow.cells[3].innerText;
            const clasificacion = editingRow.cells[4].innerText;             

            document.getElementById('formGroupExampleInput').value = name;
            document.getElementById('formGroupExampleInput2').value = price;            
            document.getElementById('formGroupExampleInput3').value = game[0].description;
            document.getElementById('formGroupExampleInput4').value = category;
            document.getElementById('select-with-game-clasification').value = clasificacion;  
            //cargamos el id del game en este input que esta con display = none, 
            document.getElementById('input-with-id-game').value = game[0].id;            
            //document.getElementById('formFileCreateGame').value = game[0].imgSrc.replace('img/', "");

            let title = document.getElementById('title-crear-juego');
            title.innerHTML = 'Modificar juego';
            let button = document.getElementById('crear-juego');
            button.innerHTML = 'Modificar';

            //Esto hace que al hacer click en el boton modificar, la pagina haga scroll hasta arriba, que es donde esta el formulario con los datos cargados para modificar
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            
        } else {
            alert('Por favor selecciona un juego.');
        }
        
    });

    function modifyGame(id){
        let gamesList = JSON.parse(localStorage.getItem('JUEGOS'));
        
        //aca de nuevo, cada vez que hago el getItem del local storage tengo que volver a instanciar esos objetos, es decir volver a combertir esos objetos en instancias de la clase Game
        gamesList = gamesList.map(gameData => new Game(
            gameData._id,
            gameData._name,
            gameData._price,
            gameData._description,
            gameData._imgSrc,
            gameData._category,
            gameData._clasificacion,
        )) 
        
        let indexGameToBeModify = gamesList.findIndex((game) => game.id == id)

        let newName = document.getElementById('formGroupExampleInput').value;
        let newPrice = parseFloat(document.getElementById('formGroupExampleInput2').value); //document.getElementById('formGroupExampleInput2').value;  
        let newDescription = document.getElementById('formGroupExampleInput3').value;
        let newCategory = document.getElementById('formGroupExampleInput4').value;
        let newClasification = document.getElementById('select-with-game-clasification').value;

        gamesList[indexGameToBeModify].name = newName;
        gamesList[indexGameToBeModify].price = newPrice;
        gamesList[indexGameToBeModify].description = newDescription;
        gamesList[indexGameToBeModify].category = newCategory;
        gamesList[indexGameToBeModify].clasificacion = newClasification;
        
        alert('Juego modificado');
        localStorage.setItem('JUEGOS', JSON.stringify(gamesList));
        listGamesInTable(gamesList);
        cleanAddGameFormInputs();        

        let title = document.getElementById('title-crear-juego');
        title.innerHTML = 'Crear juego';
        let button = document.getElementById('crear-juego');
        button.innerHTML = 'Agregar';
    }
    
});

