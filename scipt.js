// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
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


// Observe every section

sections.forEach((section) => {
    observer.observe(section);
});
