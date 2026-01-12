// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Burger menu
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("is-open"));
  });
}

// Reveal on scroll
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealIO.observe(el));

// Play animations on enter (2–5s then stop) + reset on leave
const playSections = document.querySelectorAll(".section-play");

const playIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // Force reflow to restart CSS animations reliably
      el.classList.remove("play");
      void el.offsetWidth;
      el.classList.add("play");

      // Optional: remove play after 6s so the section stays static
      // (animations already run once, but this ensures no accidental re-trigger)
      window.clearTimeout(el.__playTimeout);
      el.__playTimeout = window.setTimeout(() => {
        el.classList.remove("play");
      }, 6000);

    } else {
      // When section leaves viewport: reset so it can play again when you scroll back
      window.clearTimeout(el.__playTimeout);
      el.classList.remove("play");
    }
  });
}, { threshold: 0.22 });

playSections.forEach(s => playIO.observe(s));

// Subtle magnet hover effect on floating icons (desktop)
const floats = document.querySelectorAll(".float");
floats.forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.transform = `translate(${x * 6}px, ${y * 6}px) scale(1.03)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});
