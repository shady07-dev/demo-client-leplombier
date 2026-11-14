/* ==========================================================================
   BUBBLES — Bulles d'eau animées en fond des sections .bubbles
   Usage : <div class="bubbles" data-bubbles="14" aria-hidden="true"></div>
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  LP.components.bubbles = {
    init: function () {
      if (u.prefersReducedMotion()) return;

      u.qsa(".bubbles").forEach(function (container) {
        var count = parseInt(container.getAttribute("data-bubbles"), 10) || 12;
        var frag = document.createDocumentFragment();

        for (var i = 0; i < count; i++) {
          var b = document.createElement("span");
          var size = rand(8, 38);
          b.style.width = size + "px";
          b.style.height = size + "px";
          b.style.left = rand(0, 100) + "%";
          b.style.animationDuration = rand(9, 20) + "s";
          b.style.animationDelay = rand(-20, 0) + "s";
          frag.appendChild(b);
        }
        container.appendChild(frag);
      });
    },
  };
})();
