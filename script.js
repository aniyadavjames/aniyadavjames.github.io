// ==========================================
// SCROLL REVEAL ANIMATION
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
        threshold: 0.1
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ==========================================
// NAVIGATION
// ==========================================

const navLinks = document.querySelectorAll("nav a");


// Set active navigation item

function setActiveLink(id) {

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
        }

    });
}


// ==========================================
// NAVIGATION CLICK
// ==========================================

navLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const targetId = this.getAttribute("href").substring(1);

        const targetSection = document.getElementById(targetId);

        if (!targetSection) return;


        // Get actual height of sticky header + navigation

        const stickyHeader =
            document.querySelector(".sticky-top");

        const headerHeight =
            stickyHeader.offsetHeight;


        // Position section below sticky header

        const targetPosition =
            targetSection.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            20;


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });


        // Immediately highlight clicked item

        setActiveLink(targetId);

    });

});


// ==========================================
// ACTIVE NAVIGATION WHILE SCROLLING
// ==========================================

function updateActiveNavigation() {

    const stickyHeader =
        document.querySelector(".sticky-top");

    const headerHeight =
        stickyHeader.offsetHeight;


    let currentSection = null;

    sections.forEach((section) => {

        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop <= headerHeight + 80) {
            currentSection = section;
        }

    });


    if (currentSection) {
        setActiveLink(currentSection.id);
    }
}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTop =
    document.createElement("button");

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

    setActiveLink("about");

});


// ==========================================
// TYPING ANIMATION
// ==========================================

// Select the first profile paragraph

const typingElement =
    document.querySelector(".profile-details p");


const roles = [
    "PhD Research Scholar | IIT Delhi",
    "Computer Science & Engineering Researcher",
    "Researcher | Developer"
];


let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement) return;

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1800
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (
                roleIndex >= roles.length
            ) {
                roleIndex = 0;
            }

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 40 : 70
    );
}


typeEffect();


// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener("load", () => {

    document.body.classList.add(
        "page-loaded"
    );

    // Start with About highlighted

    setActiveLink("about");

});
