export default class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/`
        <footer class="footer">
            <div class="footer__text ss-container">
                <p class="ss-align-center">All rights reserved © Safi Airlines</p>
            </div>
        </footer>`;
    }
}

customElements.define("footer-component", Footer);
