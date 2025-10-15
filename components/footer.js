class MainFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <footer class="bg-white border-t py-8 text-center text-gray-600 text-sm">
              © 2025 RareBears · Limited Edition Dolls & Teddy Bears
            </footer>
            <script src="https://cdn.tailwindcss.com"></script>
        `;
    }
}

customElements.define('main-footer', MainFooter);
