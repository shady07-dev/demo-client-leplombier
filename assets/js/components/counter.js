/* ==========================================================================
   COUNTER — Compteurs animés
   Usage : <span data-count="20" data-suffix="+">0</span>
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  function animate(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;

    function frame(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  LP.components.counter = {
    init: function () {
      var counters = u.qsa("[data-count]");
      if (!counters.length) return;

      if (!("IntersectionObserver" in window) || u.prefersReducedMotion()) {
        counters.forEach(function (el) {
          el.textContent = (el.getAttribute("data-prefix") || "") + el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
        });
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) { observer.observe(el); });
    },
  };
})();
