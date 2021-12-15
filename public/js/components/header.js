export default class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/`
        <!-- Header -->
        <header class="header ss-shadow-2">
        <!-- Menu Icon -->
        <div class="header__menu">
            <div class="menu-bars"></div>
        </div>
        <!-- Logo -->
        <a href="/" class="header__logo">
            <img class="header__logo__img responsive" src="SafiAir-light-mobile.png" alt="Safi Air Logo">
            <img class="header__logo__img normal" src="SafiAir-light.png" alt="Safi Air Logo">
        </a>
        <!-- Theme toggler -->
        <button id="theme-toggler" aria-label="Switch to dark theme">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 472.39 472.39">
                <g class="toggle-sun">
                    <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
                </g>
                <g class="toggle-circle">
                    <circle class="cls-1" cx="236.2" cy="236.2" r="103.78" />
                </g>
            </svg>
        </button>
    </header>`;
    }
}

customElements.define("header-component", Header);
