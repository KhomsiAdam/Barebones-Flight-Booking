// Light & Dark theme toggler
export function themeToggle(button) {

    button.addEventListener("click", () => {
        document.body.classList.contains("light-theme")
        ? enableDarkMode()
        : enableLightMode();
    });

    function enableDarkMode() {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        button.setAttribute("aria-label", "Switch to light theme");
        document.querySelector('.header__logo__img.responsive').setAttribute('src', 'SafiAir-light-mobile.png')
        document.querySelector('.header__logo__img.normal').setAttribute('src', 'SafiAir-light.png')
    }
    
    function enableLightMode() {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        button.setAttribute("aria-label", "Switch to dark theme");
        document.querySelector('.header__logo__img.responsive').setAttribute('src', 'SafiAir-dark-mobile.png')
        document.querySelector('.header__logo__img.normal').setAttribute('src', 'SafiAir-dark.png')
    }
    
    function setThemePreference() {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            enableDarkMode();
            return;
        }
        enableLightMode();
    }
    setThemePreference();
}