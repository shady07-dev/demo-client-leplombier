/* ==========================================================================
   PAGE : PRESTATIONS — Scrollspy de la sous-navigation
   Met en surbrillance la prestation visible à l'écran.
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  LP.pages.prestations = {
    init: function () {
      var links = u.qsa(".subnav__link");
      if (!links.length || !("IntersectionObserver" in window)) return;

      var list = u.qs(".subnav__list");
      var map = {};
      links.forEach(function (link) {
        map[link.getAttribute("href").slice(1)] = link;
      });

      function setActive(id) {
        links.forEach(function (l) { l.classList.remove("is-active"); });
        var active = map[id];
        if (!active) return;
        active.classList.add("is-active");
        /* garde le lien actif visible dans la barre défilante (mobile) */
        if (list && list.scrollWidth > list.clientWidth) {
          list.scrollTo({
            left: active.offsetLeft - list.clientWidth / 2 + active.clientWidth / 2,
            behavior: "smooth",
          });
        }
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );

      Object.keys(map).forEach(function (id) {
        var section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    },
  };
})();
