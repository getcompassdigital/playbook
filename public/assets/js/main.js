/* Compass Digital — 2026 Playbook landing page interactions */
(function () {
  "use strict";

  /* ---- Sticky header shadow ---- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- Mobile sticky CTA ---- */
  var stickyCta = document.getElementById("mobileStickyCta");
  var card = document.getElementById("playbookSignup");
  var isMobile = function () {
    return window.matchMedia("(max-width: 720px)").matches;
  };
  var updateStickyCta = function () {
    if (!stickyCta || !card) return;
    var rect = card.getBoundingClientRect();
    var formInView = rect.top < window.innerHeight - 100 && rect.bottom > 100;
    var nearTop = window.scrollY < 140;
    var hide = !isMobile() || nearTop || formInView;
    stickyCta.classList.toggle("is-hidden", hide);
  };
  window.addEventListener("scroll", updateStickyCta, { passive: true });
  window.addEventListener("resize", updateStickyCta);
  updateStickyCta();
})();
