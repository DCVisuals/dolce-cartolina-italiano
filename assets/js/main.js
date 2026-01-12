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

// Play animations on enter (2–6s then stop) + reset on leave
const playSections = document.querySelectorAll(".section-play");
const playIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
      el.classList.remove("play");
      void el.offsetWidth;
      el.classList.add("play");

      window.clearTimeout(el.__playTimeout);
      el.__playTimeout = window.setTimeout(() => {
        el.classList.remove("play");
      }, 6000);

    } else {
      window.clearTimeout(el.__playTimeout);
      el.classList.remove("play");
    }
  });
}, { threshold: 0.22 });

playSections.forEach(s => playIO.observe(s));

// Gentle magnet hover for floating icons
document.querySelectorAll(".float").forEach(el => {
  el.addEventListener("mousemove", (e) => {
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

// Modals
function openModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.classList.add("is-open");
  m.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeModal(modal){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.open));
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeModal(modal);
  });
});

window.addEventListener("keydown", (e) => {
  if(e.key !== "Escape") return;
  const opened = document.querySelector(".modal.is-open");
  if(opened) closeModal(opened);
});

// Reviews slider (readable)
const REVIEWS = [
  { text: "„Pani Eliza jest fantastyczną nauczycielką, u Niej nie ma nudnych lekcji… ma ogromną wiedzę dotyczącą Włoch i cudownie o nich opowiada. Szczerze polecam.”", who: "Aniela W." },
  { text: "„Najlepsza, najwspanialsza i tylko Ona! Elastyczna, a jednocześnie bardzo konkretna… Włoski tylko z Elizą!”", who: "Ania K." },
  { text: "„Z całego serca polecam! Zajęcia mają przemiłą atmosferę… Eliza bardzo dobrze tłumaczy gramatykę i zapisuje błędy / nowe słówka.”", who: "Ela W." },
  { text: "„Eliza jest zawsze doskonale przygotowana… Lekcje są dynamiczne… Bardzo mocno polecam!!!”", who: "Ania J." },
  { text: "„Zdecydowanie polecam Elizę… Lekcje były w przemiłej i bezstresowej atmosferze… ‘przyjemne z pożytecznym’.”", who: "Lidia P." }
];

let revIndex = 0;
const reviewText = document.getElementById("reviewText");
const reviewWho = document.getElementById("reviewWho");

function renderReview(){
  if(!reviewText || !reviewWho) return;
  const r = REVIEWS[revIndex];
  reviewText.textContent = r.text;
  reviewWho.textContent = r.who;
}
renderReview();

document.querySelectorAll("[data-rev]").forEach(btn => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.rev;
    revIndex = (dir === "next") ? (revIndex + 1) % REVIEWS.length : (revIndex - 1 + REVIEWS.length) % REVIEWS.length;
    renderReview();
  });
});

// Reviews modal list
const reviewsList = document.getElementById("reviewsList");
if (reviewsList){
  reviewsList.innerHTML = REVIEWS.map(r => `
    <div style="padding:14px;border:1px solid rgba(15,26,22,.10);border-radius:18px;margin:10px 0;background:#fff;box-shadow:0 12px 30px rgba(0,0,0,.06)">
      <div style="font-weight:900;letter-spacing:2px;">★★★★★</div>
      <div style="margin-top:8px;color:rgba(15,26,22,.78);font-weight:600;line-height:1.5">${r.text}</div>
      <div style="margin-top:8px;color:rgba(15,26,22,.62);font-weight:900">${r.who}</div>
    </div>
  `).join("");
}
