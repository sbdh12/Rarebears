class CategoryCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <a href="${this.getAttribute('link')}" class="bg-white rounded-3xl shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden flex flex-col items-center text-center p-4">
              <img src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}" class="w-full h-56 object-cover rounded-2xl mb-4">
              <h4 class="font-playfair text-xl mb-1 text-pink-700">${this.getAttribute('title')}</h4>
              <p class="text-gray-500 text-sm">Limited Edition</p>
            </a>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
        `;
    }
}

customElements.define('category-card', CategoryCard);
