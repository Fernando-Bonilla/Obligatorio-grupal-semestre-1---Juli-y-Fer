import { Game } from "./classGame.js";

document.addEventListener('DOMContentLoaded', () => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        //aca de nuevo, cada vez que hago el getItem del local storage tengo que volver a instanciar esos objetos, es decir volver a combertir esos objetos en instancias de la clase Game
        cartItems = cartItems.map(item => new Game(
            item._id,
            item._name,
            item._price,
            item._description,
            item._imgSrc,
            item._category,
            item._clasificacion,
        ))

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

    updateCart();
    
});

