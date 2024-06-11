document.addEventListener('DOMContentLoaded', () => {   
    let arrayOfGames = JSON.parse(localStorage.getItem('JUEGOS')); 
    listGamesInTable(arrayOfGames);

    let addGameButton = document.getElementById('crear-juego');
    addGameButton.addEventListener('click', createGame);

    function createGame() {     
        //let arrayOfGames = JSON.parse(localStorage.getItem('JUEGOS'));         
                 
        let idGame = arrayOfGames.length + 1;
        let nameGame = document.getElementById('formGroupExampleInput').value;
        let priceGame = document.getElementById('formGroupExampleInput2').value;
        let descriptionGame = document.getElementById('formGroupExampleInput3').value;
        //let categoryGame = document.getElementById('formGroupExampleInput4').value;
        let clasificationGame = document.getElementById('select-with-game-clasification').value;        

        let categoryGame = document.getElementById('formGroupExampleInput4').value;
        let imgSrcGame = document.getElementById('formFileCreateGame').value;        
        let imgNewPath = `img/${imgSrcGame.replace("C:\\fakepath\\", "")}`;        

        let game = {id: idGame, name: nameGame, price: priceGame, description: descriptionGame, imgSrc: imgNewPath, category: categoryGame, clasificacion: clasificationGame};
        //let game = new Game(idGame, name, priceGame, descriptionGame, imgNewPath, categoryGame, clasificationGame);       
        
        arrayOfGames.push(game);           
        localStorage.setItem('JUEGOS', JSON.stringify(arrayOfGames));
        alert('Juego creado');  
        listGamesInTable(arrayOfGames);  
        cleanAddGameFormInputs()     
    }  
    
    function listGamesInTable(games){
        for(let game of games) {
            let tableBody = document.getElementById('table-games-listed');
            
            let tr = document.createElement('tr');
            tr.classList.add('game-table-row');  

            //let td = document.createElement('td') 

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

    }

    function removeGame() {
        
    }
    
});





class Game {
    constructor(id, name, price, description, imgSrc, category, clasificacion) {
        this.id = id;
        this._name = name;
        this._price = price;
        this._description = description;
        this._imgSrc = imgSrc;
        this._category = category;
        this._clasificacion = clasificacion;
    }   
   
}  

/*class PersistenceController{
    static name(params) {
        console.log(params)
    }

    static saveGame(){

    }

}*/
