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
  var isMobile = function () {
    return window.matchMedia("(max-width: 720px)").matches;
  };
  var updateStickyCta = function () {
    if (!stickyCta || !card) return;
    var rect = card.getBoundingClientRect();
    var formInView = rect.top < window.innerHeight - 100 && rect.bottom > 100;
    var nearTop = window.scrollY < 140;
    var hide = !isMobile() || nearTop || formInView || card.classList.contains("is-submitted");
    stickyCta.classList.toggle("is-hidden", hide);
  };
  window.addEventListener("scroll", updateStickyCta, { passive: true });
  window.addEventListener("resize", updateStickyCta);

  /* ---- Form submit (front-end demo handler) ---- */
  var form = document.getElementById("playbookForm");
  var card = form ? form.closest(".form-card") : null;
  if (form && card) {
    var getLabelText = function (input) {
      var label = form.querySelector('label[for="' + input.id + '"]');
      return label && label.childNodes.length
        ? label.childNodes[0].textContent.trim().toLowerCase()
        : "this field";
    };

    var getErrorEl = function (input) {
      var id = input.id + "Error";
      var error = document.getElementById(id);
      if (!error) {
        error = document.createElement("span");
        error.className = "field-error";
        error.id = id;
        var field = input.closest(".field");
        if (field) field.appendChild(error);
      }
      input.setAttribute("aria-describedby", id);
      return error;
    };

    var setFieldError = function (input, message) {
      var error = getErrorEl(input);
      input.classList.toggle("is-invalid", Boolean(message));
      input.setAttribute("aria-invalid", message ? "true" : "false");
      error.textContent = message || "";
      error.classList.toggle("is-visible", Boolean(message));
    };

    var validateInput = function (input) {
      var value = input.value.trim();
      if (input.required && !value) {
        return "Enter your " + getLabelText(input) + ".";
      }
      if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Enter a valid email address.";
      }
      return "";
    };

    form.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", function () {
        setFieldError(input, validateInput(input));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;
      form.querySelectorAll("input").forEach(function (input) {
        var message = validateInput(input);
        setFieldError(input, message);
        if (message) {
          valid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });
      if (!valid) {
        firstInvalid.focus();
        return;
      }
      // TODO: wire to CRM / form endpoint (HubSpot, etc.)
      card.classList.add("is-submitted");
      updateStickyCta();
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  updateStickyCta();
})();
