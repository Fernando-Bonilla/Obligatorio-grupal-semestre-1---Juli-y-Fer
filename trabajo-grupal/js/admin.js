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

    get name(){
        return this._name;
    }
    get price(){
        return this._price;
    }
    get description(){
        return this._description;
    }
    get imgSrc(){
        return this._imgSrc;
    }
    get category(){
        return this._category;
    }
    get clasificacion(){
        return this._clasificacion;
    }


    set name(new_name){
        if(new_name === ""){
            return false;
        }
        this._name = new_name;
    }
    set price(new_price){
        this._price = new_price;
    }
    set description(new_description){
        this._description = new_description;
    }
    set imgSrc(new_imgSrc){
        this._imgSrc = new_imgSrc;
    }
    set category(new_category){
        this._category = new_category;
    }
    set clasificacion(new_clasificacion){
        this._clasificacion = new_clasificacion;
    }
}  

class PersistenceController{
    static name(params) {
        console.log(params)
    }

    static saveGame(){

    }

}
