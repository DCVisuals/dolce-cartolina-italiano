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
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => revealIO.observe(el));

// Play animations on enter (2–5s then stop) + reset on leave
const playSections = document.querySelectorAll(".section-play");

const playIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // restart animations
      el.classList.remove("play");
      void el.offsetWidth;
      el.classList.add("play");

      // remove after a while so everything stays still
      window.clearTimeout(el.__playTimeout);
      el.__playTimeout = window.setTimeout(() => {
        el.classList.remove("play");
      }, 6000);

    } else {
      // reset so it can replay when scrolling back
      window.clearTimeout(el.__playTimeout);
      el.classList.remove("play");
    }
  });
}, { threshold: 0.22 });

playSections.forEach(s => playIO.observe(s));

// Gentle magnet hover (desktop only) for floating icons
const floats = document.querySelectorAll(".float");
floats.forEach(el => {
  el.addEventListener("mousemove", (e) => {
    // ignore on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.transform = `translate(${x * 5}px, ${y * 5}px) scale(1.03)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});
