/* ==========================================================================
   SCROLL UI — Bouton retour en haut, bouton d'appel mobile,
   statut de disponibilité dans la top bar, année du footer
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  function initScrollButtons() {
    var backTop = u.qs(".back-to-top");
    var callFab = u.qs(".call-fab");

    var onScroll = u.rafThrottle(function () {
      var y = window.scrollY;
      if (backTop) backTop.classList.toggle("is-visible", y > 600);
      if (callFab) callFab.classList.toggle("is-visible", y > 300);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backTop) {
      backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: u.prefersReducedMotion() ? "auto" : "smooth" });
      });
    }
  }

  /* Texte de disponibilité : lundi→vendredi au bureau, mobile à toute heure */
  function initStatus() {
    var el = u.qs("[data-status]");
    if (!el) return;
    var day = new Date().getDay(); // 0 = dimanche
    var weekday = day >= 1 && day <= 5;
    el.textContent = weekday
      ? "Disponibles aujourd'hui"
      : "Mobile joignable à toute heure";
  }

  function initYear() {
    u.qsa("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  LP.components.scrollUi = {
    init: function () {
      initScrollButtons();
      initStatus();
      initYear();
    },
  };
})();
