document.addEventListener('DOMContentLoaded', () => {

    let titleCrearJuego = document.getElementById('title-crear-juego');
    let altaFormContainer = document.getElementById('alta-form-container');

    let titleEliminarJuego = document.getElementById('title-eliminar-juego');
    let EliminarFormContainer = document.getElementById('eliminar-form-container');

    let addGameButton = document.getElementById('crear-juego');
    addGameButton.addEventListener('click', createGame);

    function createGame() {
        let name = document.getElementById('formGroupExampleInput').value;
        let price = document.getElementById('formGroupExampleInput2').value;
        let description = document.getElementById('formGroupExampleInput3').value;
        let category = document.getElementById('formGroupExampleInput4').value;
        let clasificacion = document.getElementById('formGroupExampleInput5').value;
        let imgSrc = document.getElementById('formFileCreateGame').value;

        let game = new Game(name, price, description, imgSrc, category, clasificacion);
        let arrayOfGames = JSON.parse(localStorage.getItem('GAMES'));
        arrayOfGames.push(game);
        localStorage.setItem('GAMES', JSON.stringify(arrayOfGames));
        console.log(arrayOfGames);
        showGamesList(arrayOfGames);
        
    }       
    
});

class Game {
    constructor(name, price, description, imgSrc, category, clasificacion) {
        this._name = name;
        this._price = price;
        this._description = description;
        this._imgSrc = imgSrc;
        this._category = category;
        this._clasificacion = clasificacion;
    }   
   
}  

class PersistenceController{
    static name(params) {
        console.log(params)
    }

    static saveGame(){

    }

}
