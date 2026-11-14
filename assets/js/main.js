/* ==========================================================================
   MAIN — Point d'entrée : initialise les composants communs
   puis le module de la page courante (<body data-page="...">).
   Ordre de chargement (defer) : core/* → components/* → pages/* → main.js
   ========================================================================== */

(function () {
  "use strict";

  function safeInit(name, mod) {
    if (!mod || typeof mod.init !== "function") return;
    try {
      mod.init();
    } catch (err) {
      console.error("[LP] Erreur d'initialisation :", name, err);
    }
  }

  function boot() {
    LP.icons.render();

    Object.keys(LP.components).forEach(function (name) {
      safeInit(name, LP.components[name]);
    });

    var page = document.body.getAttribute("data-page");
    if (page) safeInit("page:" + page, LP.pages[page]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
