
const cartContainer = document.getElementById("cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.textContent = "Your cart is empty.";
        return;
    }

    cart.forEach(product => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                    width="100"
                >

                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Subtotal: $${(
                    product.price * product.quantity
                ).toFixed(2)}</p>
            </div>
        `;
    });
}

renderCart();