// ==========================================================
// NewsGuard AI
// Modern UI JavaScript
// ==========================================================

// Wait until page is loaded

document.addEventListener("DOMContentLoaded", () => {

    //-------------------------------------------------------
    // Form Loading Animation
    //-------------------------------------------------------

    const form = document.getElementById("predictForm");
    const loading = document.getElementById("loading");
    const button = document.getElementById("predictButton");

    if (form) {

        form.addEventListener("submit", function () {

            loading.style.display = "block";

            button.disabled = true;

            button.innerHTML = "Analyzing...";

        });

    }

    //-------------------------------------------------------
    // Animate Confidence Progress Bar
    //-------------------------------------------------------

    const progressBar = document.querySelector(".progress-bar");

    if (progressBar) {

        const value = progressBar.dataset.width;

        setTimeout(() => {

            progressBar.style.width = value + "%";

        }, 500);

    }

    //-------------------------------------------------------
    // Fade-in Animation
    //-------------------------------------------------------

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(".feature-card, .glass-card, .prediction-card, .about")
        .forEach(el => {

            el.classList.add("hidden");

            observer.observe(el);

        });

    //-------------------------------------------------------
    // Smooth Scroll
    //-------------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            document.querySelector(this.getAttribute("href"))
                .scrollIntoView({

                    behavior: "smooth"

                });

        });

    });

    //-------------------------------------------------------
    // Button Ripple Effect
    //-------------------------------------------------------

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const rect = button.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + "px";

            ripple.style.left = e.clientX - rect.left - size / 2 + "px";

            ripple.style.top = e.clientY - rect.top - size / 2 + "px";

            ripple.className = "ripple";

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    //-------------------------------------------------------
    // Floating Cards
    //-------------------------------------------------------

    document.querySelectorAll(".feature-card").forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const x = e.offsetX;

            const y = e.offsetY;

            const rotateX = (y - card.offsetHeight / 2) / 18;

            const rotateY = (x - card.offsetWidth / 2) / -18;

            card.style.transform =
                `perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "rotateX(0) rotateY(0)";

        });

    });

    //-------------------------------------------------------
    // Navbar Background
    //-------------------------------------------------------

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            nav.style.background = "rgba(10,20,50,.75)";

            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.2)";

        }

        else {

            nav.style.background = "rgba(255,255,255,.08)";

            nav.style.boxShadow = "none";

        }

    });

    //-------------------------------------------------------
    // Auto Resize Textarea
    //-------------------------------------------------------

    const textarea = document.querySelector("textarea");

    if (textarea) {

        textarea.addEventListener("input", () => {

            textarea.style.height = "260px";

            textarea.style.height = textarea.scrollHeight + "px";

        });

    }

    //-------------------------------------------------------
    // Placeholder Typing Animation
    //-------------------------------------------------------

    if (textarea && textarea.value === "") {

        const text =
            "Paste your news article here to verify whether it is REAL or FAKE...";

        let index = 0;

        function typePlaceholder() {

            textarea.setAttribute(
                "placeholder",
                text.substring(0, index++)
            );

            if (index <= text.length) {

                setTimeout(typePlaceholder, 35);

            }

        }

        typePlaceholder();

    }

});

// ==========================================================
// Mouse Glow Effect
// ==========================================================

document.addEventListener("mousemove", e => {

    const blobs = document.querySelectorAll(".blob");

    blobs.forEach((blob, i) => {

        const speed = (i + 1) * 0.015;

        blob.style.transform =
            `translate(${e.clientX * speed}px,
                       ${e.clientY * speed}px)`;

    });

});

// ==========================================================
// Keyboard Shortcut (CTRL + ENTER)
// ==========================================================

document.addEventListener("keydown", e => {

    if (e.ctrlKey && e.key === "Enter") {

        const form = document.getElementById("predictForm");

        if (form) {

            form.submit();

        }

    }

});

// ==========================================================
// Console Message
// ==========================================================

console.log(
"%c📰 NewsGuard AI Loaded Successfully",
"color:#60a5fa;font-size:18px;font-weight:bold;"
);