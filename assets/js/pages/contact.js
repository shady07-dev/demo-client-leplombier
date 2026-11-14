/* ==========================================================================
   PAGE : CONTACT — Validation du formulaire + envoi via mailto
   NB : site statique sans serveur. Pour un envoi direct sans ouvrir la
   messagerie, brancher un service (Formspree, Web3Forms, PHP…) dans send().
   ========================================================================== */

(function () {
  "use strict";

  var u = LP.utils;
  var RECIPIENT = "leplombier73@gmail.com";

  var MESSAGES = {
    valueMissing: "Ce champ est obligatoire.",
    tooShort: "Ce champ est trop court.",
    typeMismatch: "Le format n'est pas valide.",
    patternMismatch: "Numéro de téléphone invalide (ex : 06 12 34 56 78).",
    consent: "Merci d'accepter pour pouvoir envoyer votre demande.",
  };

  function getField(input) {
    return input.closest(".field");
  }

  function validate(input) {
    var field = getField(input);
    if (!field) return true;
    var error = u.qs(".field__error", field);
    var v = input.validity;
    var msg = "";

    if (!v.valid) {
      if (input.type === "checkbox") msg = MESSAGES.consent;
      else if (v.valueMissing) msg = MESSAGES.valueMissing;
      else if (v.tooShort) msg = MESSAGES.tooShort;
      else if (v.typeMismatch) msg = MESSAGES.typeMismatch;
      else if (v.patternMismatch) msg = MESSAGES.patternMismatch;
    }

    field.classList.toggle("is-invalid", !!msg);
    field.classList.toggle("is-valid", !msg && input.value !== "" && input.type !== "checkbox");
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (error) error.textContent = msg;
    return !msg;
  }

  function send(data) {
    var lines = ["Nom : " + data.name, "Téléphone : " + data.phone];
    if (data.email) lines.push("E-mail : " + data.email);
    if (data.city) lines.push("Commune : " + data.city);
    lines.push("", data.message);
    var body = lines.join("\n");

    var href =
      "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent("[Site web] " + data.subject + " — " + data.name) +
      "&body=" + encodeURIComponent(body);

    window.location.href = href;
  }

  LP.pages.contact = {
    init: function () {
      var form = u.qs("#contact-form");
      if (!form) return;

      var inputs = u.qsa("input, select, textarea", form);
      var status = u.qs(".form__status", form);

      inputs.forEach(function (input) {
        input.addEventListener("blur", function () { validate(input); });
        input.addEventListener("input", function () {
          if (getField(input) && getField(input).classList.contains("is-invalid")) validate(input);
        });
        input.addEventListener("change", function () { validate(input); });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var firstInvalid = null;
        inputs.forEach(function (input) {
          if (!validate(input) && !firstInvalid) firstInvalid = input;
        });

        status.className = "form__status";
        if (firstInvalid) {
          status.classList.add("is-error");
          status.textContent = "Merci de corriger les champs indiqués.";
          firstInvalid.focus();
          return;
        }

        var el = form.elements; // form.name renverrait l'attribut du <form>
        send({
          name: el.namedItem("name").value.trim(),
          phone: el.namedItem("phone").value.trim(),
          email: el.namedItem("email").value.trim(),
          city: el.namedItem("city").value.trim(),
          subject: el.namedItem("subject").value,
          message: el.namedItem("message").value.trim(),
        });

        status.classList.add("is-success");
        status.textContent = "Votre messagerie s'ouvre avec votre demande pré-remplie. Il ne vous reste qu'à l'envoyer !";
      });
    },
  };
})();
