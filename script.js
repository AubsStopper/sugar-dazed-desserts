const stage = document.querySelector("#tilt-card");
const cookie = document.querySelector(".cookie-wrap");
const cards = document.querySelectorAll(".flavor-card");
const toast = document.querySelector("#toast");

if (stage && cookie && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  stage.addEventListener("pointermove", (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cookie.style.transform =
      `rotateY(${x * 12}deg) rotateX(${y * -10}deg) translateZ(20px)`;
  });
  stage.addEventListener("pointerleave", () => {
    cookie.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
  });
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    const flavor = card.dataset.flavor;
    toast.textContent = `${flavor} added to your imaginary order. Call us to make it real!`;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  });
});

// Subtle parallax for decorative elements.
window.addEventListener("scroll", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const y = window.scrollY;
  document.querySelectorAll(".orbit-one, .orbit-two").forEach((el, i) => {
    el.style.transform = `rotate(${i ? 38 : -24}deg) translateY(${y * (i ? -0.025 : 0.018)}px)`;
  });
}, { passive: true });
