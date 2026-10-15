// =====================================
// 1. ANIMATED RAIN BACKGROUND 🌧️
// =====================================

const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
let rainDrops = [];
let animationId;

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    rainDrops = [];

    const totalDrops = Math.min(
        180,
        Math.floor(width / 5)
    );

    for (let i = 0; i < totalDrops; i++) {
        rainDrops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: 8 + Math.random() * 18,
            speed: 3 + Math.random() * 5,
            opacity: 0.12 + Math.random() * 0.35
        });
    }
}

function drawRain() {
    ctx.clearRect(0, 0, width, height);

    rainDrops.forEach(drop => {
        ctx.beginPath();

        ctx.moveTo(drop.x, drop.y);

        ctx.lineTo(
            drop.x - 2,
            drop.y + drop.length
        );

        // Soft pink-gold rain
        ctx.strokeStyle =
            `rgba(255, 190, 180, ${drop.opacity})`;

        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 0.7;

        // Reset the drop after it leaves the screen
        if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
        }

        if (drop.x < -5) {
            drop.x = width + 5;
        }
    });

    animationId = requestAnimationFrame(drawRain);
}

if (!reduceMotion) {
    resizeCanvas();
    drawRain();

    window.addEventListener("resize", resizeCanvas);
}

// Pause the animation when the browser tab is hidden
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else if (!reduceMotion) {
        cancelAnimationFrame(animationId);
        drawRain();
    }
});


// =====================================
// 2. ANIMATED CHANGING TEXT
// =====================================

const changingText = document.getElementById("changingText");

const words = [
    "Story.",
    "Creative.",
    "Beautiful.",
    "Meaningful.",
    "Memorable."
];

let wordIndex = 0;

if (!reduceMotion && changingText) {
    setInterval(() => {
        changingText.animate(
            [
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(8px)" }
            ],
            {
                duration: 250,
                fill: "forwards"
            }
        ).onfinish = () => {
            wordIndex = (wordIndex + 1) % words.length;

            changingText.textContent = words[wordIndex];

            changingText.animate(
                [
                    { opacity: 0, transform: "translateY(-8px)" },
                    { opacity: 1, transform: "translateY(0)" }
                ],
                {
                    duration: 350,
                    fill: "forwards"
                }
            );
        };
    }, 2500);
}


// =====================================
// 3. WHATSAPP AUTOMATIC MESSAGES
// =====================================

const whatsappNumber = "917028185852";

document.querySelectorAll(".whatsapp").forEach(button => {
    const message =
        button.dataset.message ||
        "Assalamualaikum Samreen sis, mujhe aapki services ke baare mein details chahiye.";

    button.href =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    button.target = "_blank";
    button.rel = "noopener noreferrer";
});


// =====================================
// 4. MOBILE NAVIGATION MENU
// =====================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


// =====================================
// 5. PORTFOLIO FILTERS
// =====================================

const filterButtons = document.querySelectorAll(".filter-btn");
const videoCards = document.querySelectorAll(".video-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        videoCards.forEach(card => {
            const type = card.dataset.type;

            const shouldShow =
                filter === "all" || type === filter;

            card.classList.toggle("hidden", !shouldShow);

            // Stop a video if it becomes hidden
            if (!shouldShow) {
                const video = card.querySelector("video");

                if (video) {
                    video.pause();
                }
            }
        });
    });
});


// =====================================
// 6. SCROLL REVEAL ANIMATIONS
// =====================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


// =====================================
// 7. BACK TO TOP BUTTON
// =====================================

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
    backTop.classList.toggle(
        "show",
        window.scrollY > 500
    );
}, { passive: true });

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =====================================
// 8. FOOTER YEAR
// =====================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// =====================================
// 9. SAMREEN'S PROFILE PHOTO
// =====================================

const photo = document.querySelector(".portrait-frame img");
const photoPlaceholder = document.querySelector(".portrait-placeholder");

function updatePhoto() {
    if (photo.complete && photo.naturalWidth > 0) {
        photo.style.display = "block";
        photoPlaceholder.style.display = "none";
    } else {
        photo.style.display = "none";
        photoPlaceholder.style.display = "flex";
    }
}

photo.addEventListener("load", updatePhoto);
photo.addEventListener("error", updatePhoto);

updatePhoto();