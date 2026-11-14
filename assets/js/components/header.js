/* ==========================================================================
   HEADER — Effet au scroll + menu burger mobile
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  LP.components.header = {
    init: function () {
      var header = u.qs(".header");
      var burger = u.qs(".burger");
      var nav = u.qs(".nav");
      if (!header) return;

      /* Ombre + réduction de hauteur au scroll */
      var onScroll = u.rafThrottle(function () {
        header.classList.toggle("is-scrolled", window.scrollY > 20);
      });
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      if (!burger || !nav) return;

      function setOpen(open) {
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
        nav.classList.toggle("is-open", open);
        document.body.classList.toggle("no-scroll", open);
      }

      burger.addEventListener("click", function () {
        setOpen(burger.getAttribute("aria-expanded") !== "true");
      });

      /* Fermeture : clic sur un lien, touche Échap, passage en desktop */
      u.qsa("a", nav).forEach(function (link) {
        link.addEventListener("click", function () { setOpen(false); });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
      });
      window.matchMedia("(min-width: 961px)").addEventListener("change", function (e) {
        if (e.matches) setOpen(false);
      });
    },
  };
})();
