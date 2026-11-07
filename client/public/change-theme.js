let iconTheme = document.querySelector("#theme button");
let body = document.querySelector("body");

iconTheme.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.style.backgroundColor = body.classList.contains("dark-mode") ? "var(--bg-dark-mode)" : "var(--bg-default)";
    body.style.color = body.classList.contains("dark-mode") ? "var(--text-color-dark-mode)" : "var(--text-color-default)";
});