// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1
        }
    );


    sections.forEach(function (section) {

        observer.observe(section);

    });


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const navLinks = document.querySelectorAll("nav a");


    function setActiveLink(id) {

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + id) {
                link.classList.add("active");
            }

        });

    }


    // ==========================================
    // NAVIGATION CLICK
    // ==========================================

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId =
                this.getAttribute("href").substring(1);

            const targetSection =
                document.getElementById(targetId);

            if (!targetSection) return;


            const stickyTop =
                document.querySelector(".sticky-top");

            const headerHeight =
                stickyTop.offsetHeight;


            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            setActiveLink(targetId);

        });

    });


    // ==========================================
    // ACTIVE NAVIGATION WHILE SCROLLING
    // ==========================================

    function updateActiveNavigation() {

        const stickyTop =
            document.querySelector(".sticky-top");

        const headerHeight =
            stickyTop.offsetHeight;


        let currentSection = "about";


        sections.forEach(function (section) {

            const sectionTop =
                section.getBoundingClientRect().top;


            if (sectionTop <= headerHeight + 100) {

                currentSection = section.id;

            }

        });


        setActiveLink(currentSection);

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    // ==========================================
    // BACK TO TOP
    // ==========================================

    const backToTop =
        document.createElement("button");


    backToTop.innerHTML = "↑";

    backToTop.className = "back-to-top";

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

        setActiveLink("about");

    });


    // ==========================================
    // TYPING ANIMATION
    // ==========================================

    const typingElement =
        document.querySelector(".profile-details p");


    if (typingElement) {

        const roles = [

            "PhD Research Scholar | IIT Delhi",

            "Computer Science & Engineering Researcher",

            "Researcher | Developer"

        ];


        let roleIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeEffect() {

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

    }


    // ==========================================
    // PAGE LOAD
    // ==========================================

    document.body.classList.add(
        "page-loaded"
    );


    // Set initial navigation

    setActiveLink("about");

});
