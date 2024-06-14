
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
   
} 