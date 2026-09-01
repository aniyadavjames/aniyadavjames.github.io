// ==========================================
// 1. SCROLL REVEAL ANIMATION
// ==========================================

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ==========================================
// 2. ACTIVE NAVIGATION
// ==========================================

const navLinks = document.querySelectorAll("nav a");

const navObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    },
    {
        threshold: 0.4
    }
);

sections.forEach((section) => {
    navObserver.observe(section);
});


// ==========================================
// 3. BACK TO TOP BUTTON
// ==========================================

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.className = "back-to-top";

document.body.appendChild(backToTop);


// Show button after scrolling

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});


// Scroll to top

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==========================================
// 4. TYPING ANIMATION
// ==========================================

const typingElement = document.querySelector(".profile-details p");

const roles = [
    "PhD Research Scholar | IIT Delhi",
    "Computer Science & Engineering Researcher",
    "Researcher | Developer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex === roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 80
    );
}


// Start typing animation

typeEffect();


// ==========================================
// 5. PAGE LOAD ANIMATION
// ==========================================

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
