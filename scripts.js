// Configuramos IntersectionObserver para detectar cuando el elemento de habilidades entra la vista de la pantalla
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  },
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Script para la luz que sigue al cursor
document.addEventListener("mousemove", (e) => {
  const luz = document.getElementById("luz");
  luz.style.left = `${e.clientX}px`;
  luz.style.top = `${e.clientY}px`;
});

// Carrusel de proyectos
(function () {
  const track = document.getElementById("carousel-track");
  const outer = document.getElementById("carousel-outer");
  const btnPrev = document.getElementById("carousel-prev");
  const btnNext = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");

  if (!track) return;

  const slides = track.querySelectorAll(".carousel-slide");
  const total = slides.length;
  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 8000;

  // Crear dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goTo(i);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    dotsContainer.querySelectorAll(".carousel-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  function updateButtons() {
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
    updateButtons();
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goTo(current + 1);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  btnPrev.addEventListener("click", () => {
    goTo(current - 1);
    resetAutoplay();
  });
  btnNext.addEventListener("click", () => {
    goTo(current + 1);
    resetAutoplay();
  });

  // Pausa al pasar el ratón
  outer.addEventListener("mouseenter", stopAutoplay);
  outer.addEventListener("mouseleave", startAutoplay);

  // Swipe táctil
  let startX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      stopAutoplay();
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      startAutoplay();
    },
    { passive: true },
  );

  updateButtons();
  startAutoplay();
})();

// Script para activacion aleatoria de las habilidades
function activarHabilidadAleatoria() {
  const habilidades = document.querySelectorAll(".habilidad");

  habilidades.forEach((h) => h.classList.remove("active"));

  const randomIndex = Math.floor(Math.random() * habilidades.length);
  habilidades[randomIndex].classList.add("active");
}

setInterval(activarHabilidadAleatoria, 2500);
