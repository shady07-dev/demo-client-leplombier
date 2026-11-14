/* ==========================================================================
   REVEAL — Apparition des éléments au scroll
   Usage :
     <div data-reveal="up">               (up | down | left | right | zoom)
     <div data-reveal-stagger="0.1">      décale automatiquement les enfants [data-reveal]
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  LP.components.reveal = {
    init: function () {
      /* Délais en cascade pour les groupes */
      u.qsa("[data-reveal-stagger]").forEach(function (group) {
        var step = parseFloat(group.getAttribute("data-reveal-stagger")) || 0.1;
        u.qsa("[data-reveal]", group).forEach(function (el, i) {
          el.style.setProperty("--reveal-delay", (i * step).toFixed(2) + "s");
        });
      });

      var items = u.qsa("[data-reveal]");

      if (!("IntersectionObserver" in window) || u.prefersReducedMotion()) {
        items.forEach(function (el) { el.classList.add("is-revealed"); });
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      items.forEach(function (el) { observer.observe(el); });
    },
  };
})();
