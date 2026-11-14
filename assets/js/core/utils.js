/* ==========================================================================
   UTILS — Namespace global et fonctions utilitaires
   Chargé en premier : définit window.LP utilisé par tous les autres scripts.
   ========================================================================== */

(function () {
  "use strict";

  window.LP = window.LP || {
    components: {}, // modules communes à toutes les pages
    pages: {},      // modules spécifiques à une page (clé = data-page du <body>)
  };

  LP.utils = {
    /** Raccourci querySelector */
    qs: function (selector, scope) {
      return (scope || document).querySelector(selector);
    },

    /** Raccourci querySelectorAll -> Array */
    qsa: function (selector, scope) {
      return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    },

    /** Limite l'exécution d'une fonction à une fois par frame */
    rafThrottle: function (fn) {
      var ticking = false;
      return function () {
        var args = arguments;
        var ctx = this;
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          fn.apply(ctx, args);
          ticking = false;
        });
      };
    },

    /** L'utilisateur préfère-t-il réduire les animations ? */
    prefersReducedMotion: function () {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
  };
})();
