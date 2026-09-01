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

        "Computer Science & Engineering ",
        "Algorithms | Fault-tolerance Graphs"



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
    // 8. PROJECT FILTERS
    // ==========================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    function applyProjectFilter(filter) {

        projectCards.forEach(function (card) {

            const category =
                card.getAttribute("data-category") || "";

            const matches =
                filter === "all" ||
                category.includes(filter);

            card.classList.toggle("hidden", !matches);
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selected =
                this.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");
            applyProjectFilter(selected);
        });
    });

    applyProjectFilter("all");


    // ==========================================
    // 9. STAT COUNTER ANIMATION
    // ==========================================

    const statNumbers =
        document.querySelectorAll(".stat-number");

    const statsObserver =
        new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const statElement =
                        entry.target;

                    const targetValue =
                        Number(
                            statElement.getAttribute("data-target")
                        ) || 0;

                    let currentValue = 0;
                    const step = Math.max(1, Math.ceil(targetValue / 30));

                    const timer = setInterval(function () {
                        currentValue += step;
                        if (currentValue >= targetValue) {
                            currentValue = targetValue;
                            clearInterval(timer);
                        }
                        statElement.textContent =
                            currentValue.toString();
                    }, 35);

                    observer.unobserve(statElement);
                });
            },
            { threshold: 0.4 }
        );

    statNumbers.forEach(function (stat) {
        statsObserver.observe(stat);
    });


    // ==========================================
    // 10. PAGE LOAD ANIMATION
    // ==========================================

    document.body.classList.add(
        "page-loaded"
    );



    // ==========================================
    // 11. INITIAL NAVIGATION
    // ==========================================

    setActiveLink("about");

});
