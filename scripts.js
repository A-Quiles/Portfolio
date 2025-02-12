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
  }
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

// Script para activacion aleatoria de las habilidades
function activarHabilidadAleatoria() {
  const habilidades = document.querySelectorAll(".habilidad");

  habilidades.forEach((h) => h.classList.remove("active"));

  const randomIndex = Math.floor(Math.random() * habilidades.length);
  habilidades[randomIndex].classList.add("active");
}

setInterval(activarHabilidadAleatoria, 2500);
