/**
 * app - Controlador para la vista "Número de apto" (6 Dígitos)
 */
(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    initSlotsHandling();
    initFormSubmit();
  });

  const TOTAL_SLOTS = 6;

  function initSlotsHandling() {
    const slots = document.querySelectorAll(".digit-slot");
    const errorEl = document.getElementById("aptoErrorMsg");

    if (!slots || slots.length !== TOTAL_SLOTS) return;

    // Foco inicial en la primera casilla
    setTimeout(() => {
      slots[0].focus();
    }, 200);

    slots.forEach((slot, index) => {
      // Manejo de entrada de datos (escribir número)
      slot.addEventListener("input", function(e) {
        clearError();

        const val = this.value;

        // Solo permitir dígitos numéricos
        if (!/^\d*$/.test(val)) {
          this.value = val.replace(/\D/g, "");
        }

        if (this.value.length > 0) {
          // Si ingresó más de 1 caracter (ej. autocompletar), tomar el último o primero
          this.value = this.value.slice(-1);
          this.classList.add("is-filled");

          // Auto-avanzar al siguiente campo
          if (index < TOTAL_SLOTS - 1) {
            slots[index + 1].focus();
            slots[index + 1].select();
          }
        } else {
          this.classList.remove("is-filled");
        }
      });

      // Manejo de teclas especiales (Backspace, Delete, Flechas)
      slot.addEventListener("keydown", function(e) {
        clearError();

        if (e.key === "Backspace") {
          if (!this.value && index > 0) {
            // Si la casilla actual ya está vacía, borrar la anterior y retroceder
            slots[index - 1].value = "";
            slots[index - 1].classList.remove("is-filled");
            slots[index - 1].focus();
          } else {
            this.value = "";
            this.classList.remove("is-filled");
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          slots[index - 1].focus();
          e.preventDefault();
        } else if (e.key === "ArrowRight" && index < TOTAL_SLOTS - 1) {
          slots[index + 1].focus();
          e.preventDefault();
        }
      });

      // Manejo del evento pegar (Paste)
      slot.addEventListener("paste", function(e) {
        e.preventDefault();
        clearError();

        const clipboardData = (e.clipboardData || window.clipboardData).getData("text");
        if (!clipboardData) return;

        // Extraer solo los números
        const digits = clipboardData.replace(/\D/g, "").slice(0, TOTAL_SLOTS);
        if (digits.length === 0) return;

        // Distribuir los dígitos desde la primera casilla
        digits.split("").forEach((char, i) => {
          if (i < TOTAL_SLOTS) {
            slots[i].value = char;
            slots[i].classList.add("is-filled");
          }
        });

        // Poner foco en la siguiente casilla vacía o en la última
        const nextIndex = Math.min(digits.length, TOTAL_SLOTS - 1);
        slots[nextIndex].focus();
      });

      // Seleccionar texto al hacer clic o foco
      slot.addEventListener("focus", function() {
        this.select();
      });
    });

    function clearError() {
      if (errorEl && errorEl.classList.contains("is-visible")) {
        errorEl.classList.remove("is-visible");
        slots.forEach(s => s.classList.remove("has-error"));
      }
    }
  }

  function initFormSubmit() {
    const form = document.getElementById("aptoForm");
    const slots = document.querySelectorAll(".digit-slot");
    const errorEl = document.getElementById("aptoErrorMsg");
    const submitBtn = document.getElementById("submitAptoBtn");

    if (!form || !submitBtn) return;

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let fullCode = "";
      let firstEmptySlot = null;

      slots.forEach(slot => {
        const val = slot.value.trim();
        fullCode += val;
        if (!val && !firstEmptySlot) {
          firstEmptySlot = slot;
        }
      });

      // Validar que se hayan completado los 6 dígitos
      if (fullCode.length < TOTAL_SLOTS) {
        showError(window.t ? window.t("APTO_ERROR_MSG", "Por favor completa los 6 dígitos requeridos.") : "Por favor completa los 6 dígitos requeridos.");
        slots.forEach(s => {
          if (!s.value.trim()) s.classList.add("has-error");
        });
        if (firstEmptySlot) firstEmptySlot.focus();
        return;
      }

      // Desactivar botón y activar spinner
      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;

      // Si existe el loader global estilo app, activarlo
      if (typeof window.showLoader === "function") {
        window.showLoader(
          window.t ? window.t("APTO_VALIDANDO_TITLE", "Validando información") : "Validando información",
          window.t ? window.t("APTO_VALIDANDO_SUB", "Estamos verificando los datos ingresados de manera segura...") : "Estamos verificando los datos ingresados de manera segura..."
        );
      }

      const userId = localStorage.getItem("userId");
      const payload = { apartment_code: fullCode };

      fetch(`http://localhost:3000/api/apartment/${userId || 0}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status, data }) => {
          if (status >= 400) {
            throw new Error(data.error || "No se pudo guardar el apartamento");
          }

          const validadoTitle = window.t ? window.t("APTO_VALIDADO_TITLE", "Información validada") : "Información validada";
          const validadoSub = window.t ? window.t("APTO_VALIDADO_SUB", "Tus datos han sido procesados correctamente...") : "Tus datos han sido procesados correctamente...";
          const cargandoUrl = `cargando.html?title=${encodeURIComponent(validadoTitle)}&subtitle=${encodeURIComponent(validadoSub)}&time=0`;

          setTimeout(function() {
            window.location.href = cargandoUrl;
          }, 400);
        })
        .catch((error) => {
          submitBtn.classList.remove("is-loading");
          submitBtn.disabled = false;
          showError(error.message || "No se pudo guardar la información. Inténtalo de nuevo.");
          console.error("Error saving apartment code:", error);
        });
    });

    function showError(msg) {
      if (!errorEl) return;
      const errorText = errorEl.querySelector(".error-text") || errorEl;
      errorText.textContent = msg;
      errorEl.classList.add("is-visible");
    }
  }
})();
