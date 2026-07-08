/* Compass Digital — 2026 Playbook landing page interactions */
(function () {
  "use strict";

  /* ---- Sticky header shadow + scroll progress ---- */
  var header = document.getElementById("siteHeader");
  var progress = document.getElementById("scrollProgress");
  var onScroll = function () {
    if (header) {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    }
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
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

  /* ---- Playbook growth map controls ---- */
  var mapButtons = document.querySelectorAll(".map-ribbon__button");
  var mapSteps = document.querySelectorAll("[data-map-step]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var setActiveMapStep = function (targetId, shouldScroll, shouldPulse) {
    var target = document.getElementById(targetId);
    if (!target || !mapButtons.length || !mapSteps.length) return;

    mapButtons.forEach(function (button) {
      var active = button.getAttribute("data-map-target") === targetId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    mapSteps.forEach(function (step) {
      step.classList.toggle("is-map-active", step.id === targetId);
      step.classList.remove("is-map-pulsing");
    });

    if (shouldPulse && !reduceMotion.matches) {
      target.classList.add("is-map-pulsing");
      window.setTimeout(function () {
        target.classList.remove("is-map-pulsing");
      }, 750);
    }

    if (shouldScroll) {
      target.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
        block: isMobile() ? "start" : "center",
        inline: "nearest"
      });
    }
  };

  if (mapButtons.length && mapSteps.length) {
    mapButtons.forEach(function (button) {
      var targetId = button.getAttribute("data-map-target");
      button.addEventListener("click", function () {
        setActiveMapStep(targetId, isMobile(), true);
      });
    });

    if ("IntersectionObserver" in window) {
      var mapObserver = new IntersectionObserver(
        function (entries) {
          if (!isMobile()) return;
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setActiveMapStep(entry.target.id, false, false);
            }
          });
        },
        { threshold: 0.55, rootMargin: "-18% 0px -34% 0px" }
      );
      mapSteps.forEach(function (step) {
        mapObserver.observe(step);
      });
    }
  }

  /* ---- Stats count-up ---- */
  var statNums = document.querySelectorAll(".stat__num[data-count]");
  if (statNums.length && "IntersectionObserver" in window && !reduceMotion.matches) {
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1200;
      var start = null;
      var tick = function (ts) {
        if (start === null) start = ts;
        var t = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (t < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    };
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statNums.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  /* ---- Embedded form loading state ---- */
  var formEmbed = document.getElementById("playbookFormEmbed");
  var formFrame = formEmbed ? formEmbed.querySelector(".playbook-form-frame") : null;
  var markFormReady = function () {
    if (formEmbed) {
      formEmbed.classList.remove("is-loading");
    }
  };
  if (formFrame && formEmbed) {
    formFrame.addEventListener("load", function () {
      window.setTimeout(markFormReady, 180);
    }, { once: true });
    window.setTimeout(markFormReady, 12000);
  }

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
