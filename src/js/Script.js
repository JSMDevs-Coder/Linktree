/* ===============================
   SELECTORES
================================ */
const toggle = document.getElementById("langToggle");
const esBtn = document.querySelector(".lang-option.es");
const enBtn = document.querySelector(".lang-option.en");
const typingElement = document.getElementById("typing");

/* ===============================
   TRADUCCIONES
================================ */
const translations = {
    es: {
        title: "JS | Jahir SanMartin",
        description: `
            Desarrollador Full Stack en Práctica<br>
            Creando aplicaciones web modernas con código limpio<br>
            y escalable. Apasionado por el aprendizaje y por convertir<br>
            ideas en soluciones reales.
        `,
        github: "GitHub",
        facebook: "Facebook",
        instagram: "Instagram",
        tiktok: "TikTok"
    },
    en: {
        title: "JS | Jahir SanMartin",
        description: `
            Full Stack Developer in Practice<br>
            Building modern web applications with clean<br>
            and scalable code. Passionate about learning and turning<br>
            ideas into real-world solutions.
        `,
        github: "GitHub",
        facebook: "Facebook",
        instagram: "Instagram",
        tiktok: "TikTok"
    }
};

/* ===============================
   TEXTOS DEL TYPING EFFECT
================================ */
const typingTexts = {
    es: [
        "Desarrollador Full Stack",
        "Amante del café",
        "Amante de los gatos",
        "Hondureño",
        "Amante de los videojuegos"
    ],
    en: [
        "Full-Stack Developer",
        "Coffee Lover",
        "Cat Lover",
        "Honduran",
        "Video Game Lover"
    ]
};

/* ===============================
   ESTADO
================================ */
let lang = localStorage.getItem("language") || "es";
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

/* ===============================
   CONFIGURACIÓN DE VELOCIDAD
================================ */
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPING = 1200;
const PAUSE_AFTER_DELETING = 300;

/* ===============================
   FUNCIÓN IDIOMA
================================ */
function setLanguage(newLang) {
    lang = newLang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.innerHTML = translations[newLang][key];
    });

    // Reiniciar typing effect correctamente
    clearTimeout(typingTimeout);
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingElement.textContent = "";

    localStorage.setItem("language", newLang);
    startTyping();
}

/* ===============================
   TYPING EFFECT (ESTABLE)
================================ */
function startTyping() {
    const texts = typingTexts[lang];
    const currentText = texts[textIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.slice(0, charIndex);
        charIndex++;

        if (charIndex > currentText.length) {
            typingTimeout = setTimeout(() => {
                isDeleting = true;
                startTyping();
            }, PAUSE_AFTER_TYPING);
            return;
        }
    } else {
        typingElement.textContent = currentText.slice(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;

            typingTimeout = setTimeout(() => {
                startTyping();
            }, PAUSE_AFTER_DELETING);
            return;
        }
    }

    typingTimeout = setTimeout(
        startTyping,
        isDeleting ? DELETING_SPEED : TYPING_SPEED
    );
}

/* ===============================
   EVENTOS
================================ */
// Switch
toggle.addEventListener("change", () => {
    if (toggle.checked) {
        setLanguage("en");
        enBtn.classList.add("active");
        esBtn.classList.remove("active");
    } else {
        setLanguage("es");
        esBtn.classList.add("active");
        enBtn.classList.remove("active");
    }
});

// Click banderas
esBtn.addEventListener("click", () => {
    toggle.checked = false;
    setLanguage("es");
    esBtn.classList.add("active");
    enBtn.classList.remove("active");
});

enBtn.addEventListener("click", () => {
    toggle.checked = true;
    setLanguage("en");
    enBtn.classList.add("active");
    esBtn.classList.remove("active");
});

/* ===============================
   INICIALIZACIÓN
================================ */
if (lang === "en") {
    toggle.checked = true;
    enBtn.classList.add("active");
    esBtn.classList.remove("active");
} else {
    esBtn.classList.add("active");
    enBtn.classList.remove("active");
}

setLanguage(lang);
