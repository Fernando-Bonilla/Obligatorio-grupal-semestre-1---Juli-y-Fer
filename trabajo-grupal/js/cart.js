import { Game } from "./classGame.js";
import { users } from "./purchases.js";

document.addEventListener('DOMContentLoaded', () => {

    let userIdCurrentlySelected = JSON.parse(localStorage.getItem('userIdCurrentlySelected')) || [];
    //console.log(userIdCurrentlySelected)
    let usersPurchases = JSON.parse(localStorage.getItem('userPurchases')) || users;    
    console.log(usersPurchases)        

    let indexUser = usersPurchases.findIndex(user => user.id == userIdCurrentlySelected);    
    
    let cartList = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');    
    
    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        if(usersPurchases[indexUser].items.length == 0){
            console.log('no entra al vacio')
            const emptyCartMessage = document.createElement('li');
            emptyCartMessage.textContent = 'El carrito de este usuario esta vacío. ¡Agrega juegos!';
            cartList.appendChild(emptyCartMessage);

        }else {
            usersPurchases[indexUser].items.forEach(item => {
                //console.log('entra')
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item._name} - $${item._price}`;
                cartList.appendChild(listItem);
                total += item._price;
            });
            
        }
        totalElement.textContent = `$${total}`;
    }

    updateCart();

    document.getElementById('checkout').addEventListener('click', () => {
        if(usersPurchases[indexUser].items.length > 0) {
            alert('Gracias por su compra.');
            usersPurchases[indexUser].items = [];
            console.log(usersPurchases[indexUser].items)
            localStorage.setItem('userPurchases', JSON.stringify(usersPurchases));
            //localStorage.removeItem('userPurchases');        
            totalElement.textContent = "";
            cartList.innerHTML = "";

        }
        
    });


    /*let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        //aca de nuevo, cada vez que hago el getItem del local storage tengo que volver a instanciar esos objetos, es decir volver a combertir esos objetos en instancias de la clase Game
        cartItems = cartItems.map(item => new Game(
            item._id,
            item._name,
            item._price,
            item._description,
            item._imgSrc,
            item._category,
            item._clasificacion,
        ));

    const cartList = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            const emptyCartMessage = document.createElement('li');
            emptyCartMessage.textContent = 'El carrito está vacío. ¡Agrega juegos!';
            cartList.appendChild(emptyCartMessage);
        } else {
            cartItems.forEach(item => {                
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item.name} - $${item.price}`;
                cartList.appendChild(listItem);
                total += item.price;
            });
        }

        totalElement.textContent = `$${total}`;
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Gracias por su compra.');
        localStorage.removeItem('cart');
        updateCart();
        totalElement.textContent = "";
        cartList.innerHTML = "";
    });

    updateCart();*/
    
});

