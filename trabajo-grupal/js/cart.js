import { Game } from "./classGame.js";
import { users } from "./purchases.js";

document.addEventListener('DOMContentLoaded', () => {

    let cartAcumulated = JSON.parse(localStorage.getItem('cartAcumulated')) || [];
    if(cartAcumulated.length != 0){  
        cartAcumulated = cartAcumulated.map(gameData => new Game(
            gameData._id,
            gameData._name,
            gameData._price,
            gameData._description,
            gameData._imgSrc,
            gameData._category,
            gameData._clasificacion,
        ));       
    }


    let userIdCurrentlySelected = JSON.parse(localStorage.getItem('userIdCurrentlySelected')) || [];
           
    let usersPurchases = JSON.parse(localStorage.getItem('userPurchases')) || users;
    let indexUser = usersPurchases.findIndex(user => user.id == userIdCurrentlySelected); 

    if(usersPurchases[indexUser].items.length != 0){        
        usersPurchases[indexUser].items = usersPurchases[indexUser].items.map(usersPurchasesItem => new Game(
            usersPurchasesItem._id,
            usersPurchasesItem._name,
            usersPurchasesItem._price,
            usersPurchasesItem._description,
            usersPurchasesItem._imgSrc,
            usersPurchasesItem._category,
            usersPurchasesItem._clasificacion,
        ));       
    } 
    
    let cartList = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');    
    
    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        if(usersPurchases[indexUser].items.length == 0){
            //console.log('no entra al vacio')
            const emptyCartMessage = document.createElement('li');
            emptyCartMessage.textContent = 'El carrito de este usuario esta vacío. ¡Agrega juegos!';
            cartList.appendChild(emptyCartMessage);

        }else {
            usersPurchases[indexUser].items.forEach(item => {
                //console.log('entra')
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item.name} - $${item.price}`;
                cartList.appendChild(listItem);
                total += item.price;               

            });

            if(usersPurchases[indexUser].items.length > 3) {               
                total = total * 0.85;             
                
            }
            
        }
        totalElement.textContent = `$${total.toFixed(2)}`; //el toFixed(2) hace que solo muestre dos decimales despues de la coma
    }

    updateCart();

    document.getElementById('checkout').addEventListener('click', () => {
        if(usersPurchases[indexUser].items.length > 0) {
            alert('Gracias por su compra.');

            usersPurchases[indexUser].items.forEach((item) => {
                cartAcumulated.push(item);
            })            

            localStorage.setItem('cartAcumulated', JSON.stringify(cartAcumulated)); 

            usersPurchases[indexUser].items = [];
            //console.log(usersPurchases[indexUser].items)
            localStorage.setItem('userPurchases', JSON.stringify(usersPurchases));
                   
            totalElement.textContent = "";
            cartList.innerHTML = "";
            //console.log(cartAcumulated)

        }
        
    });   
    
});

