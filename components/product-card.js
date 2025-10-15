class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Add any component-specific styles here */
            </style>
            <div class="bg-white rounded-3xl shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden flex flex-col">
              <img src="${this.getAttribute('image')}" alt="${this.getAttribute('name')}" class="w-full h-72 object-cover rounded-3xl">
              <div class="p-6 flex flex-col text-center">
                <span class="badge mb-2">${this.getAttribute('stock')}</span>
                <h3 class="font-playfair text-xl mb-2 text-gray-800">${this.getAttribute('name')}</h3>
                <p class="text-pink-600 font-semibold text-lg mb-4">${this.getAttribute('price')}</p>
                <a href="${this.getAttribute('link')}" class="mt-auto block px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition font-semibold">View Details</a>
              </div>
            </div>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
        `;
    }
}

customElements.define('product-card', ProductCard);
