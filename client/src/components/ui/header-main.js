import { PATHS } from "../../routes/paths.js";

const NAV_ITEMS = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#processo", label: "Processo" },
    { href: "#contato", label: "Contato" }
];

const BRAND_MARK = `
    <svg class="brand__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="37" height="37" rx="11" stroke="currentColor" stroke-width="1.4" opacity=".45"/>
        <path d="M11 28V14.2c0-.8.9-1.2 1.5-.6L20 21l7.5-7.4c.6-.6 1.5-.2 1.5.6V28" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

class HeaderMain extends HTMLElement {
    connectedCallback() {
        if (this.dataset.ready) return;
        this.dataset.ready = "true";

        this.innerHTML = `
            <header class="header-main">
                <div class="container header__inner">
                    <a class="brand" href="${PATHS.index}" aria-label="Jhuan Móveis Planejados — página inicial">
                        ${BRAND_MARK}
                        <span class="brand__text">
                            <span class="brand__name">jhuan</span>
                            <span class="brand__tagline">móveis planejados</span>
                        </span>
                    </a>

                    <nav class="nav" id="navMenu" aria-label="Navegação principal">
                        <ul class="nav__list">
                            ${NAV_ITEMS.map(
                                (item) => `<li><a class="nav__link" href="${item.href}">${item.label}</a></li>`
                            ).join("")}
                        </ul>
                        <div class="nav__footer">
                            <a class="btn btn--primary" href="#contato">Solicitar orçamento</a>
                            <a class="link-arrow" href="tel:+5511999999999">(11) 99999-9999</a>
                        </div>
                    </nav>

                    <div class="header__actions">
                        <button class="theme-toggle" id="theme" type="button" aria-label="Ativar tema escuro" aria-pressed="false">
                            <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                            </svg>
                            <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/>
                                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <a class="btn btn--primary header__cta" href="#contato">Solicitar orçamento</a>
                        <button class="menu-toggle" id="menuToggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="navMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
        `;

        this.setupMenu();
        this.setupScrollState();
    }

    setupMenu() {
        const toggle = this.querySelector("#menuToggle");
        const nav = this.querySelector("#navMenu");
        if (!toggle || !nav) return;

        const setOpen = (open) => {
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
            nav.classList.toggle("is-open", open);
            document.body.classList.toggle("menu-open", open);
        };

        toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        nav.addEventListener("click", (event) => {
            if (event.target.closest("a")) setOpen(false);
        });

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setOpen(false);
        });

        window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
            if (event.matches) setOpen(false);
        });
    }

    setupScrollState() {
        const header = this.querySelector(".header-main");
        if (!header) return;

        const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
        update();
        window.addEventListener("scroll", update, { passive: true });
    }
}

customElements.define("header-main", HeaderMain);
