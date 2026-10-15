
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".siteheader .menu-toggle");
    const menu = document.querySelector(".siteheader .main-nav");

    if (!button || !menu) return;

    function closeMenu() {
        menu.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Ouvrir le menu");
        button.textContent = "☰";
    }

    button.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("is-open");

        button.setAttribute("aria-expanded", String(isOpen));
        button.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
        button.textContent = isOpen ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
});
