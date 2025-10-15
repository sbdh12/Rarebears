
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(category, id) {
    const cart = getCart();
    if (!cart.find(item => item.category === category && item.id === id)) {
        cart.push({ category, id, quantity: 1 });
        saveCart(cart);
        showNotification('Product added to cart!');
    } else {
        showNotification('Product is already in the cart.');
    }
}

function removeFromCart(category, id) {
    let cart = getCart();
    cart = cart.filter(item => !(item.category === category && item.id === id));
    saveCart(cart);
    
    if (document.getElementById('cart-container')) {
        renderCart();
    }
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) {
        cartIcon.textContent = cartCount;
        cartIcon.classList.toggle('hidden', cartCount === 0);
    }
}

async function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-container');
    const summary = document.getElementById('cart-summary');
    
    if (!container || !summary) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 col-span-full">Your cart is empty.</p>';
        summary.classList.add('hidden');
        return;
    }

    const res = await fetch(`products.json?v=${new Date().getTime()}`);
    const data = await res.json();
    
    let subtotal = 0;

    cart.forEach(item => {
        const product = data[item.category].find(p => p.id === item.id);
        if (product) {
            const price = parseFloat(product.price.replace(/[₹,]/g, ''));
            subtotal += price * item.quantity;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item flex items-center gap-4 border-b border-gray-200 py-4 cart-item-card mb-4';
            
            itemDiv.innerHTML = `
                <div class="flex-shrink-0">
                    <a href="product.html?type=${item.category}&id=${item.id}">
                        <img src="${product.image}" alt="${product.name}" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md">
                    </a>
                </div>

                <div class="flex-grow">
                    <a href="product.html?type=${item.category}&id=${item.id}">
                        <h3 class="font-cormorant text-[1.35rem] font-medium mb-2 hover:text-gold transition-colors">${product.name}</h3>
                    </a>
                    <p class="text-gray-500 text-xs sm:text-sm mb-1">Quantity: ${item.quantity}</p>
                    <p class="font-medium sm:hidden">${product.price}</p>
                </div>

                <div class="hidden sm:block flex-shrink-0 text-right">
                    <p class="font-medium text-lg">${product.price}</p>
                </div>

                <div class="flex-shrink-0 pl-2">
                     <button class="remove-button text-gray-400 hover:text-red-500 transition-colors">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;

            itemDiv.querySelector('.remove-button').addEventListener('click', () => {
                removeFromCart(item.category, item.id);
            });

            container.appendChild(itemDiv);
        }
    });

    summary.classList.remove('hidden');
    document.getElementById('subtotal-price').textContent = `₹${subtotal.toFixed(2)}`;
    
    // Animate the items
    gsap.from(".cart-item", { 
        duration: 0.5,
        opacity: 0, 
        y: 20, 
        stagger: 0.1, 
        ease: "power1.out" 
    });
}


document.addEventListener('DOMContentLoaded', updateCartCount);
