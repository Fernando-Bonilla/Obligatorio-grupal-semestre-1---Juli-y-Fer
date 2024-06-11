document.addEventListener('DOMContentLoaded', () => {   

    let addGameButton = document.getElementById('crear-juego');
    addGameButton.addEventListener('click', createGame);

    function createGame() {     
        let arrayOfGames = JSON.parse(localStorage.getItem('JUEGOS')); 
        console.log(arrayOfGames)
                 
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
        //let game = new Game(name, price, description, imgSrc, category, clasificacion);       
        
        arrayOfGames.push(game);           
        localStorage.setItem('JUEGOS', JSON.stringify(arrayOfGames));
        alert('Juego creado');         
    }  
    
    function listGames(){
        
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
