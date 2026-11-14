/* ==========================================================================
   ACCORDION — FAQ accessible (un seul panneau ouvert à la fois)
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;

  LP.components.accordion = {
    init: function () {
      u.qsa(".accordion").forEach(function (accordion) {
        var items = u.qsa(".accordion__item", accordion);

        items.forEach(function (item) {
          var trigger = u.qs(".accordion__trigger", item);
          if (!trigger) return;

          trigger.addEventListener("click", function () {
            var willOpen = !item.classList.contains("is-open");

            items.forEach(function (other) {
              other.classList.remove("is-open");
              var t = u.qs(".accordion__trigger", other);
              if (t) t.setAttribute("aria-expanded", "false");
            });

            item.classList.toggle("is-open", willOpen);
            trigger.setAttribute("aria-expanded", String(willOpen));
          });
        });
      });
    },
  };
})();
