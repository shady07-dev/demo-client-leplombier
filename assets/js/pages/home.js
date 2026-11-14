/* ==========================================================================
   PAGE : ACCUEIL — Texte rotatif du hero + effet 3D sur la carte d'appel
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  /* Fait défiler les mots définis dans data-rotator='["…","…"]' */
  function initRotator() {
    var el = u.qs("[data-rotator]");
    if (!el || u.prefersReducedMotion()) return;

    var words;
    try {
      words = JSON.parse(el.getAttribute("data-rotator"));
    } catch (e) {
      return;
    }
    if (!words || words.length < 2) return;

    var index = 0;
    setInterval(function () {
      el.classList.add("is-out");
      setTimeout(function () {
        index = (index + 1) % words.length;
        el.textContent = words[index];
        el.classList.remove("is-out");
      }, 350);
    }, 2800);
  }

  /* Inclinaison 3D légère suivant la souris (desktop uniquement) */
  function initTilt() {
    var card = u.qs("[data-tilt]");
    if (!card || u.prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var area = card.parentElement;
    var max = 10; // degrés

    area.addEventListener("mousemove", u.rafThrottle(function (e) {
      var r = area.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "rotateY(" + x * max + "deg) rotateX(" + -y * max + "deg)";
    }));
    area.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  }

  LP.pages.home = {
    init: function () {
      initRotator();
      initTilt();
    },
  };
})();
