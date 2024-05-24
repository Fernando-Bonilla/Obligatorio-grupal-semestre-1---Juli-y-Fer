document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
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
                listItem.textContent = `${item.name} - $${item.price}`;
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

