const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
}

function initContactForm() {
    const form = document.querySelector("#contactForm");
    if (!form) return;

    const success = document.querySelector("#formSuccess");
    const whatsappNumber = form.dataset.whatsapp;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const message = [
            `Olá! Meu nome é ${data.get("nome")}.`,
            `Ambiente de interesse: ${data.get("ambiente")}.`,
            `WhatsApp: ${data.get("whatsapp")}.`,
            data.get("mensagem") ? `Detalhes: ${data.get("mensagem")}` : ""
        ]
            .filter(Boolean)
            .join("\n");

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
            "_blank",
            "noopener"
        );

        form.reset();
        if (success) success.hidden = false;
    });
}

function initFooterYear() {
    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initContactForm();
    initFooterYear();
});
