const body = document.body;

function initThemeToggle() {
    const toggle = document.querySelector("#theme");

    if (!toggle) return;

    const sync = () => {
        const isDark = body.classList.contains("dark-mode");
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
    };

    toggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        sync();
    });

    sync();
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
