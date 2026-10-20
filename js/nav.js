const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".menu-button");
const logoToggle = document.querySelector(".logo");

navToggle.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible");
    const logoColor = logoToggle.getAttribute("data-visible");

    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
        logoToggle.setAttribute("data-visible", true);
    } else if (visibility === "true") {
        primaryNav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
        logoToggle.setAttribute("data-visible", false);
    }

});