function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function addToWishlist(category, id) {
    const wishlist = getWishlist();
    if (!wishlist.find(item => item.category === category && item.id === id)) {
        wishlist.push({ category, id });
        saveWishlist(wishlist);
        showNotification('Product added to wishlist!');
    } else {
        showNotification('Product is already in the wishlist.');
    }
}

function removeFromWishlist(category, id) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => !(item.category === category && item.id === id));
    saveWishlist(wishlist);
    renderWishlist();
}

function updateWishlistCount() {
    const wishlist = getWishlist();
    const wishlistCount = wishlist.length;
    const wishlistIcon = document.getElementById('wishlist-count');
    if (wishlistIcon) {
        wishlistIcon.textContent = wishlistCount;
        wishlistIcon.classList.toggle('hidden', wishlistCount === 0);
    }
}

async function renderWishlist() {
    const wishlist = getWishlist();
    const container = document.getElementById('wishlist-container');

    if (!container) return;

    container.innerHTML = '';

    if (wishlist.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-12">Your wishlist is empty.</p>';
        return;
    }

    const res = await fetch(`products.json?v=${new Date().getTime()}`);
    const data = await res.json();

    wishlist.forEach(item => {
        const product = data[item.category].find(p => p.id === item.id);
        if (product) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'wishlist-item p-6';

            itemDiv.innerHTML = `
                <div class="flex items-center space-x-6">
                    <div class="flex-shrink-0 w-24">
                        <a href="product.html?type=${item.category}&id=${item.id}">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-cover rounded-md shadow-sm">
                        </a>
                    </div>
                    <div class="flex-grow">
                        <div class="flex justify-between items-center">
                            <div>
                                <a href="product.html?type=${item.category}&id=${item.id}">
                                    <h3 class="font-cormorant text-xl font-medium text-gray-900 hover:text-gold transition-colors">${product.name}</h3>
                                </a>
                                <p class="text-gray-600 text-base mt-1">${product.price}</p>
                            </div>
                            <button class="remove-btn text-gray-400 hover:text-red-500 transition-colors"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <button class="add-to-cart-btn flex items-center justify-center"><svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>Add to Cart</button>
                </div>
            `;

            itemDiv.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                addToCart(item.category, item.id);
            });

            itemDiv.querySelector('.remove-btn').addEventListener('click', () => {
                removeFromWishlist(item.category, item.id);
            });

            container.appendChild(itemDiv);
        }
    });
}

document.addEventListener('DOMContentLoaded', updateWishlistCount);
