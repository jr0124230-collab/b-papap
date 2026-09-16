/**
 * BBVA - Controlador para vista y overlay de carga (Loader)
 */
(function() {
  // Funcion para mostrar el loader overlay en cualquier pagina
  window.showLoader = function(titleText, subtitleText) {
    let overlay = document.getElementById("cargandoOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "cargandoOverlay";
      overlay.className = "cargando-overlay";
      overlay.innerHTML = `
        <div class="cargando-card" role="status" aria-live="polite">
          <div class="bbva-spinner-container">
            <svg class="bbva-spinner-svg" viewBox="0 0 80 80">
              <circle class="bbva-spinner-track" cx="40" cy="40" r="32"></circle>
              <circle class="bbva-spinner-arc" cx="40" cy="40" r="32"></circle>
            </svg>
            <div class="bbva-spinner-dot"></div>
            <div class="bbva-spinner-center-pulse"></div>
          </div>
          <h2 class="cargando-title" id="cargandoTitle">
            ${titleText || "Cargando"}<span class="cargando-dots"><span>.</span><span>.</span><span>.</span></span>
          </h2>
          <p class="cargando-subtitle" id="cargandoSubtitle">
            ${subtitleText || "Por favor espera un momento mientras procesamos tu solicitud."}
          </p>
          <div class="cargando-progress-bar-wrapper">
            <div class="cargando-progress-bar-fill"></div>
          </div>
          <div class="cargando-security-note">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
            </svg>
            <span>Conexi&oacute;n cifrada y segura</span>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    } else {
      if (titleText) {
        const titleEl = overlay.querySelector("#cargandoTitle");
        if (titleEl) titleEl.innerHTML = `${titleText}<span class="cargando-dots"><span>.</span><span>.</span><span>.</span></span>`;
      }
      if (subtitleText) {
        const subEl = overlay.querySelector("#cargandoSubtitle");
        if (subEl) subEl.textContent = subtitleText;
      }
      overlay.classList.remove("is-hidden");
    }
  };

  // Funcion para ocultar el loader
  window.hideLoader = function() {
    const overlay = document.getElementById("cargandoOverlay");
    if (overlay) {
      overlay.classList.add("is-hidden");
    }
  };

  // Soporte para parametros en URL si se abre como pagina cargando.html directa
  document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get("redirect");
    const delay = parseInt(params.get("time") || "3000", 10);
    const customTitle = params.get("title");
    const customSub = params.get("subtitle");

    if (customTitle) {
      const titleEl = document.getElementById("cargandoTitleText");
      if (titleEl) titleEl.textContent = customTitle;
    }
    if (customSub) {
      const subEl = document.getElementById("cargandoSubtitle");
      if (subEl) subEl.textContent = customSub;
    }

    if (redirectUrl) {
      setTimeout(function() {
        window.location.href = redirectUrl;
      }, delay);
    }
  });
})();
