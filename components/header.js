
class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <header class="bg-white shadow-sm">
              <div class="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <h1 class="font-playfair text-3xl text-pink-700">RareBears</h1>
                <nav class="space-x-6 text-gray-700 text-sm sm:text-base font-semibold">
                  <a href="index.html" class="hover:text-gold transition">Home</a>
                  <a href="category.html?type=diwali" class="hover:text-gold transition">Collection</a>
                  <a href="#" class="hover:text-gold transition">Cart</a>
                  <a href="#" class="hover:text-gold transition">Future</a>
                </nav>
              </div>
            </header>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                .font-playfair { font-family: 'Playfair Display', serif; }
                .text-pink-700 { color: #be185d; }
                .hover\:text-gold:hover { color: #FDE68A; }
                .transition { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
            </style>
        `;
    }
}

customElements.define('main-header', MainHeader);
