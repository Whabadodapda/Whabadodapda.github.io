/* ===========================================================
   Passione Italiana — site behaviour
   =========================================================== */
(function () {
  "use strict";

  // === Votre code existant (language toggle, header, mobile nav, tabs, reveal) ===

  /* ---------- language toggle (FR / EN) ---------- */
  var STORAGE_KEY = "pi-lang";
  var langButtons = document.querySelectorAll("[data-lang-btn]");
  var translatable = document.querySelectorAll("[data-fr]");
  var htmlEl = document.documentElement;

  function applyLang(lang) {
    translatable.forEach(function (el) {
      var value = el.getAttribute("data-" + lang);
      if (value === null) return;
      if (el.hasAttribute("data-attr")) {
        el.setAttribute(el.getAttribute("data-attr"), value);
      } else {
        el.innerHTML = value;
      }
    });
    langButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });
    htmlEl.setAttribute("lang", lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang-btn"));
    });
  });

  var saved = "fr";
  try { saved = localStorage.getItem(STORAGE_KEY) || "fr"; } catch (e) {}
  applyLang(saved);

  /* ---------- sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- menu tabs ---------- */
  var tabs = document.querySelectorAll(".menu-tab");
  var panels = document.querySelectorAll(".menu-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");
      tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
      panels.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-panel") === target);
      });
    });
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- current year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NOUVEAU: Set active nav link based on current page ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(function(link) {
    var linkHref = link.getAttribute('href');
    // Handle home page
    if (currentPage === 'index.html' && linkHref === '/') {
      link.classList.add('active');
    }
    // Handle other pages
    else if (linkHref !== '/' && currentPage === linkHref) {
      link.classList.add('active');
    }
  });

})();
