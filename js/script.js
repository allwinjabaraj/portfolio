// =========================================
// ALLWIN JABARAJ - PORTFOLIO
// JAVASCRIPT
// =========================================


// =========================================
// 1. SELECT ELEMENTS
// =========================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".header");
const navItems = document.querySelectorAll(".nav-links a");


// =========================================
// 2. MOBILE MENU
// =========================================

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuBtn.setAttribute(
            "aria-label",
            isOpen
                ? "Close menu"
                : "Open menu"
        );

        menuBtn.textContent =
            isOpen ? "✕" : "☰";

    });
}


// =========================================
// 3. CLOSE MENU WHEN LINK IS CLICKED
// =========================================

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
            "aria-label",
            "Open menu"
        );

    });

});


// =========================================
// 4. CLOSE MENU WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener("click", (event) => {

    if (
        navLinks &&
        menuBtn &&
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

});


// =========================================
// 5. CLOSE MENU WITH ESCAPE KEY
// =========================================

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        navLinks.classList.contains("active")
    ) {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

});


// =========================================
// 6. HEADER EFFECT ON SCROLL
// =========================================

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.boxShadow =
            "0 8px 30px rgba(0, 0, 0, 0.25)";

    } else {

        header.style.boxShadow = "none";

    }

});


// =========================================
// 7. ACTIVE NAVIGATION LINK
// =========================================

const sections =
    document.querySelectorAll("main section");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// =========================================
// 8. PAGE LOAD
// =========================================

window.addEventListener("load", () => {

    window.scrollTo(0, 0);

});