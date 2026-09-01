document.addEventListener("DOMContentLoaded", function () {
    const stickyTop = document.querySelector(".sticky-top");
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    function getStickyHeight() {
        return stickyTop ? stickyTop.offsetHeight : 0;
    }

    function setActiveLink(id) {
        navLinks.forEach(function (link) {
            const active = link.getAttribute("href") === "#" + id;
            link.classList.toggle("active", active);
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href") || "";
            if (!href.startsWith("#")) {
                return;
            }

            const target = document.getElementById(href.slice(1));
            if (!target) {
                return;
            }

            event.preventDefault();
            const targetTop = target.getBoundingClientRect().top + window.scrollY;
            const offsetTop = Math.max(0, targetTop - getStickyHeight() - 12);
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
            setActiveLink(target.id);
        });
    });

    function updateActiveOnScroll() {
        const marker = getStickyHeight() + 24;
        let currentId = sections.length > 0 ? sections[0].id : "";

        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= marker) {
                currentId = section.id;
            }
        });

        if (currentId) {
            setActiveLink(currentId);
        }
    }

    window.addEventListener("scroll", updateActiveOnScroll, { passive: true });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach(function (section) {
        revealObserver.observe(section);
    });

    const backToTop = document.createElement("button");
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.textContent = "↑";
    document.body.appendChild(backToTop);

    function toggleBackToTop() {
        backToTop.classList.toggle("visible", window.scrollY > 320);
    }

    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const firstSectionId = sections.length > 0 ? sections[0].id : "";
        if (firstSectionId) {
            setActiveLink(firstSectionId);
        }
    });

    const typingText = document.getElementById("typing-text");
    const roles = [
        "PhD Research Scholar | IIT Delhi",
        "Computer Science & Engineering",
        "Algorithms | Fault-Tolerant Graphs"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function typeRole() {
        if (!typingText || roles.length === 0) {
            return;
        }

        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            characterIndex += 1;
        } else {
            characterIndex -= 1;
        }

        typingText.textContent = currentRole.slice(0, characterIndex);

        let delay = isDeleting ? 40 : 75;

        if (!isDeleting && characterIndex >= currentRole.length) {
            isDeleting = true;
            delay = 1400;
        } else if (isDeleting && characterIndex <= 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 300;
        }

        setTimeout(typeRole, delay);
    }

    typeRole();
    updateActiveOnScroll();
    toggleBackToTop();
});
