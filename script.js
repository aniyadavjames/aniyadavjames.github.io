// ==========================================
// WAIT FOR PAGE TO LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // 1. SCROLL REVEAL ANIMATION
    // ==========================================

    const sections = document.querySelectorAll("section");

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // Animation happens only once
                    sectionObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.08
        }
    );


    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });



    // ==========================================
    // 2. NAVIGATION ELEMENTS
    // ==========================================

    const navLinks = document.querySelectorAll("nav a");

    const stickyTop = document.querySelector(".sticky-top");



    // ==========================================
    // 3. SET ACTIVE NAVIGATION
    // ==========================================

    function setActiveLink(id) {

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + id
            ) {

                link.classList.add("active");

            }

        });

    }



    // ==========================================
    // 4. NAVIGATION CLICK
    // ==========================================

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();


            const targetId =
                this.getAttribute("href").substring(1);


            const targetSection =
                document.getElementById(targetId);


            if (!targetSection) {
                return;
            }


            // Get actual height of sticky header
            const stickyHeight =
                stickyTop.offsetHeight;


            // Calculate exact scroll position
            const sectionPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY;


            const scrollPosition =
                sectionPosition -
                stickyHeight -
                20;


            // Scroll smoothly
            window.scrollTo({

                top: scrollPosition,

                behavior: "smooth"

            });


            // Highlight immediately
            setActiveLink(targetId);

        });

    });



    // ==========================================
    // 5. ACTIVE NAVIGATION WHILE SCROLLING
    // ==========================================

    function updateActiveNavigation() {

        const stickyHeight =
            stickyTop.offsetHeight;


        // Position where a section becomes active
        const activationPoint =
            stickyHeight + 50;


        let currentSection = "about";


        sections.forEach(function (section) {

            const sectionTop =
                section.getBoundingClientRect().top;


            if (sectionTop <= activationPoint) {

                currentSection =
                    section.id;

            }

        });


        setActiveLink(currentSection);

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );



    // ==========================================
    // 6. BACK TO TOP BUTTON
    // ==========================================

    const backToTop =
        document.createElement("button");


    backToTop.innerHTML = "↑";

    backToTop.className = "back-to-top";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(backToTop);



    // Show / hide button

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 400) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        }
    );



    // Back to top click

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

            setActiveLink("about");

        }
    );



    // ==========================================
    // 7. PROFESSIONAL TYPEWRITER
    // ==========================================

    const typingText =
        document.getElementById("typing-text");


    const roles = [

        "PhD Research Scholar | IIT Delhi",

        "Computer Science & Engineering Researcher",

        "Researcher | Developer"

    ];


    let roleIndex = 0;

    let characterIndex = 0;

    let deleting = false;



    function typeWriter() {

        if (!typingText) {
            return;
        }


        const currentRole =
            roles[roleIndex];


        // ------------------------------
        // TYPING
        // ------------------------------

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex + 1
                );


            characterIndex++;


            // Finished typing
            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;


                setTimeout(
                    typeWriter,
                    1800
                );


                return;
            }

        }


        // ------------------------------
        // DELETING
        // ------------------------------

        else {

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex - 1
                );


            characterIndex--;


            // Finished deleting
            if (characterIndex === 0) {

                deleting = false;

                roleIndex++;


                if (
                    roleIndex >=
                    roles.length
                ) {

                    roleIndex = 0;

                }

            }

        }


        setTimeout(
            typeWriter,
            deleting ? 35 : 70
        );

    }


    // Start typing
    typeWriter();



    // ==========================================
    // 8. PAGE LOAD ANIMATION
    // ==========================================

    document.body.classList.add(
        "page-loaded"
    );



    // ==========================================
    // 9. INITIAL NAVIGATION
    // ==========================================

    setActiveLink("about");

});
