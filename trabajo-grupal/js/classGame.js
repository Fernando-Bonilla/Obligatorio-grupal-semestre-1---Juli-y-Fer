
export class Game {
    constructor(id, name, price, description, imgSrc, category, clasificacion) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._description = description;
        this._imgSrc = imgSrc;
        this._category = category;
        this._clasificacion = clasificacion;
    }
    get id(){
        return this._id;
    }
    get name(){
        return this._name
    }
    get price(){
        return this._price
    }
    get description(){
        return this._description
    }
    get imgSrc(){
        return this._imgSrc
    }
    get category(){
        return this._category
    }
    get clasificacion(){
        return this._clasificacion
    }

    set id(value){
        this._id = value;
    }

    set name(value){
        this._name = value;
    }

    set price(value){
        this._price = value;
    }

    set description(value){
        this._description = value;
    }

    set imgSrc(value){
        this._imgSrc= value;
    }
   
    set category(value){
        this._category = value;
    }

    set clasificacion(value){
        this._clasificacion = value;
    }

   
} 