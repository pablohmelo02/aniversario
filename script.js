const body = document.body;
const giftIntro = document.querySelector("#giftIntro");
const openGift = document.querySelector("#openGift");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const heartField = document.querySelector("#heartField");
const backgroundMusic = document.querySelector("#backgroundMusic");
const musicControl = document.querySelector("#musicControl");
let giftOpened = false;

// Acrescente ?preview=1 ao endereço para pular o envelope durante os ajustes.
const previewMode = new URLSearchParams(window.location.search).has("preview");

function scrollToTopInstantly() {
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  document.documentElement.style.scrollBehavior = previousBehavior;
}

if (previewMode) {
  giftIntro.classList.add("hidden");
  body.classList.remove("intro-open");
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  document.documentElement.style.scrollBehavior = "auto";
  window.addEventListener("load", () => {
    document.querySelector(window.location.hash || "#inicio")?.scrollIntoView();
  });
} else {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
  scrollToTopInstantly();
  window.addEventListener("load", scrollToTopInstantly, { once: true });
  window.addEventListener("pageshow", scrollToTopInstantly);
}

openGift.addEventListener("click", () => {
  scrollToTopInstantly();
  openGift.blur();
  giftOpened = true;
  giftIntro.classList.add("opening");
  createHearts(14);
  startBackgroundMusic();

  window.setTimeout(() => {
    giftIntro.classList.add("hidden");
    body.classList.remove("intro-open");
    scrollToTopInstantly();
    document.querySelector(".hero .reveal")?.classList.add("visible");
  }, 1100);
});

function updateMusicControl(isPlaying) {
  musicControl.hidden = false;
  musicControl.classList.toggle("playing", isPlaying);
  musicControl.setAttribute("aria-label", isPlaying ? "Pausar música" : "Continuar música");
  musicControl.title = isPlaying ? "Pausar música" : "Continuar música";
  musicControl.querySelector("small").textContent = isPlaying ? "tocando agora" : "música pausada";
  musicControl.querySelector(".music-icon").textContent = isPlaying ? "♫" : "▶";
}

function startBackgroundMusic() {
  backgroundMusic.volume = 0.48;
  const playAttempt = backgroundMusic.play();

  if (playAttempt) {
    playAttempt
      .then(() => updateMusicControl(true))
      .catch(() => {
        // Sem o MP3, o site continua normalmente e o controle fica oculto.
      });
  }
}

backgroundMusic.addEventListener("canplay", () => {
  if (giftOpened && backgroundMusic.paused) startBackgroundMusic();
});

musicControl.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play().then(() => updateMusicControl(true));
  } else {
    backgroundMusic.pause();
    updateMusicControl(false);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
  revealObserver.observe(element);
});

document.querySelectorAll(".memory-photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    const sourceImage = photo.querySelector("img");
    lightboxImage.src = sourceImage.src;
    lightboxImage.alt = sourceImage.alt;
    lightboxCaption.textContent = photo.dataset.caption;
    lightbox.showModal();
    body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.close();
  if (!body.classList.contains("intro-open")) body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

function createHearts(amount = 22) {
  const symbols = ["♡", "♥", "✦"];

  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement("span");
    heart.className = "flying-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${4 + Math.random() * 92}%`;
    heart.style.setProperty("--size", `${14 + Math.random() * 24}px`);
    heart.style.setProperty("--duration", `${3.4 + Math.random() * 2.7}s`);
    heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    heart.style.setProperty("--spin", `${-80 + Math.random() * 160}deg`);
    heart.style.animationDelay = `${Math.random() * 0.6}s`;
    heartField.appendChild(heart);

    window.setTimeout(() => heart.remove(), 7000);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) closeLightbox();
});
