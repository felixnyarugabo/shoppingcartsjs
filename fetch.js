
const productsContainer = document.getElementById("products");

let store = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchProducts() {
    try {
        const response = await fetch(
            "https://dummyjson.com/products"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        store = data.products;

        store.forEach(product => {
            productsContainer.innerHTML += `
                <div class="product">
                    <img
                        src="${product.thumbnail}"
                        alt="${product.title}"
                    >
                    <h2>${product.title}</h2>
                    <p>Price: $${product.price}</p>

                    <button onclick="addTocart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.log(error.message);
        productsContainer.textContent =
            "Failed to load products.";
    }
}

function addTocart(productId) {
    const product = store.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}

fetchProducts();
