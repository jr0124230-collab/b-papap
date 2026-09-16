/**
 * =============================================================================
 * VARIABLES DE TEXTO EXCLUSIVAS PARA LOGIN (login.html)
 * =============================================================================
 * 
 * Este archivo centraliza todas las variables de texto de la página login.html.
 * Permite cambiar cualquier texto, placeholder, mensaje de error o enlace
 * directamente desde aquí, sin necesidad de modificar el archivo HTML.
 * 
 * CÓMO CAMBIAR EL IDIOMA O TEXTOS:
 * 1. Edita los valores en el diccionario 'TEXTOS_LOGIN' abajo (sección 'es' o 'en').
 * 2. Para cambiar el idioma por defecto edita IDIOMA_POR_DEFECTO = "es" o "en".
 * 3. También puedes probar cualquier idioma en la URL agregando '?lang=en':
 *      http://127.0.0.1:5500/login.html?lang=en
 * 4. O mediante la función en consola: window.cambiarIdiomaLogin('en');
 * =============================================================================
 */

(function(root) {
  "use strict";

  // Idioma activo por defecto ('es' = Español, 'en' = English)
  const IDIOMA_POR_DEFECTO = "es";

  // ===========================================================================
  // DICCIONARIO DE VARIABLES DE TEXTO PARA LOGIN
  // ===========================================================================
  const TEXTOS_LOGIN = {
    // -------------------------------------------------------------------------
    // ESPAÑOL (es)
    // -------------------------------------------------------------------------
    es: {
      // === PÁGINA Y METADATOS ===
      LOGIN_PAGE_TITLE: "Paycampesino Net Colombia",

      // === CABECERA Y NAVEGACIÓN (header-login) ===
      LOGIN_NAV_LOGO_ALT: "Paycampesino Logo",
      LOGIN_NAV_PERSONAS: "Personas",
      LOGIN_NAV_EMPRESAS: "Empresas",
      LOGIN_NAV_CERRAR: "Cerrar",
      LOGIN_NAV_CERRAR_ARIA: "Cerrar",
      LOGIN_NAV_URL_PERSONAS: "#",
      LOGIN_NAV_URL_EMPRESAS: "https://www.bbva.com.co/empresas.html",
      LOGIN_NAV_URL_CERRAR: "https://www.bbva.com.co/",

      // === BARRA DE SEGURIDAD (secure-bar-login) ===
      LOGIN_SECURE_BAR_TEXT: "Estás en un entorno con seguridad Paycampesino",

      // === FORMULARIO DE ACCESO (content-login) ===
      LOGIN_FORM_TITLE: "Hola, inicia sesión en Paycampesino Net:",

      // Tipos de documento
      LOGIN_DOC_TYPE_CC: "Cédula de ciudadanía",
      LOGIN_DOC_TYPE_CE: "Cédula de Extranjería",
      LOGIN_DOC_TYPE_TI: "Tarjeta de Identidad",
      LOGIN_DOC_TYPE_PP: "Pasaporte",
      LOGIN_DOC_TYPE_NIP: "Número de Identificación Personal",
      LOGIN_DOC_TYPE_CV: "Permiso Permanencia Temporal",

      // Campo Documento
      LOGIN_INPUT_DOC_PLACEHOLDER: "Número de documento",
      LOGIN_ERROR_DOC_REQUIRED: "Este campo es requerido.",

      // Campo Contraseña
      LOGIN_INPUT_PASS_PLACEHOLDER: "Contraseña",
      LOGIN_ERROR_PASS_REQUIRED: "Este campo es requerido.",
      LOGIN_ARIA_PASS_SHOW: "Mostrar contraseña",
      LOGIN_ARIA_PASS_HIDE: "Ocultar contraseña",

      // Botones y enlaces del formulario
      LOGIN_BTN_SUBMIT: "Entrar",
      LOGIN_LINK_FORGOT_PASS: "¿Olvidaste tu contraseña?",
      LOGIN_URL_FORGOT_PASS: "https://nuevaversion.bbvanet.com.co/bbvaco/kqpu_co_web/page/forgetPassword",

      // === SECCIÓN PROMOCIONAL LATERAL (content-login) ===
      LOGIN_PROMO_ALT: "Register",
      LOGIN_PROMO_TITLE: "Empieza hoy con Paycampesino Net",
      LOGIN_PROMO_DESC: "Regístrate para consultar tus productos en línea. Luego podrás activar tu App Paycampesino si la necesitas.",
      LOGIN_PROMO_BTN: "Regístrate",

      // === CARRUSEL DE RECOMENDACIONES DE SEGURIDAD (content-login) ===
      LOGIN_TIP_1_TITLE: "No compartas tu información",
      LOGIN_TIP_1_DESC: "Tus claves de acceso son secretas. No las compartas por correo, SMS o por llamada.",

      LOGIN_TIP_2_TITLE: "Cuidado con llamadas falsas",
      LOGIN_TIP_2_DESC: "No devuelvas llamadas de números extraños. Siempre usa los canales oficiales de Paycampesino.",

      LOGIN_TIP_3_TITLE: "Nunca reveles tus códigos",
      LOGIN_TIP_3_DESC: "Paycampesino jamás te pedirá códigos por mensaje de texto, correo o llamada que tú no hayas iniciado.",

      LOGIN_TIP_4_TITLE: "Protege tus datos bancarios",
      LOGIN_TIP_4_DESC: "No digites contraseñas ni códigos en enlaces o apps que no reconozcas. Son sensibles.",

      LOGIN_TIP_5_TITLE: "¿Notaste algo extraño?",
      LOGIN_TIP_5_DESC: "Si diste datos o ves movimientos sospechosos, contáctanos de inmediato en la Línea Paycampesino.",

      LOGIN_TIPS_COUNTER: "3 de 5",

      // === PIE DE PÁGINA INSTITUCIONAL (footer-login) ===
      LOGIN_FOOTER_LOGO_ALT: "Paycampesino Icono Blanco",
      LOGIN_FOOTER_FACEBOOK_TEXT: "Facebook",
      LOGIN_FOOTER_FACEBOOK_ARIA: "Paycampesino Colombia en Facebook",
      LOGIN_FOOTER_TWITTER_TEXT: "X (Twitter)",
      LOGIN_FOOTER_TWITTER_ARIA: "Paycampesino Colombia en X (Twitter)",
      LOGIN_FOOTER_LINKEDIN_TEXT: "LinkedIn",
      LOGIN_FOOTER_LINKEDIN_ARIA: "Paycampesino Colombia en LinkedIn",
      LOGIN_FOOTER_YOUTUBE_TEXT: "YouTube",
      LOGIN_FOOTER_YOUTUBE_ARIA: "Paycampesino Colombia en YouTube",

      LOGIN_FOOTER_SITEMAP: "Sitemap",
      LOGIN_FOOTER_SEGURIDAD: "Seguridad",
      LOGIN_FOOTER_AVISO_LEGAL: "Aviso legal",
      LOGIN_FOOTER_POLITICAS: "Políticas",
      LOGIN_FOOTER_REGLAMENTO: "Reglamento de productos",
      LOGIN_FOOTER_COPYRIGHT: "© 2026 Paycampesino Colombia. Todos los derechos reservados.",

      // === MODALES Y DIÁLOGOS DEL SISTEMA ===
      // Modal: Error de acceso
      LOGIN_MODAL_ACCESS_ERROR_TITLE: "No es posible ingresar",
      LOGIN_MODAL_ACCESS_ERROR_DESC: "No ha sido posible validar tu acceso, comunícate con nosotros o dirígete a la oficina más cercana para ayudarte.",
      LOGIN_MODAL_ACCESS_ERROR_BTN: "Entendido",

      // Modal: Servicio no disponible
      LOGIN_MODAL_UNAVAILABLE_ALT: "Servicio no disponible",
      LOGIN_MODAL_UNAVAILABLE_TITLE: "Servicio temporalmente no disponible",
      LOGIN_MODAL_UNAVAILABLE_DESC: "Lo sentimos, en este momento nuestros servicios presentan intermitencias. Estamos trabajando para solucionarlo lo antes posible. Agradecemos tu paciencia y te invitamos a intentarlo mas tarde. Te sugerimos usar nuestro canal Movil, para más información en",
      LOGIN_MODAL_UNAVAILABLE_LINK: "https://bbva.com.co/personas/servicios-digitales/app-bbva.html",
      LOGIN_MODAL_UNAVAILABLE_BTN: "Entendido",

      // Modal: Sesión expirada
      LOGIN_MODAL_EXPIRED_TITLE: "Tu sesión ha expirado",
      LOGIN_MODAL_EXPIRED_DESC: "Hemos cerrado tu sesión por inactividad. Es por tu seguridad.",
      LOGIN_MODAL_EXPIRED_BTN: "Entendido",

      // Indicadores de carga y comprobantes
      LOGIN_LOADING_TITLE: "Cargando",
      LOGIN_LOADING_SUBTITLE: "Por favor espera un momento mientras procesamos tu solicitud.",
      LOGIN_COMPROBANTE_ARIA: "Comprobante transferencia internacional",
      LOGIN_COMPROBANTE_PAGINACION: "1/1"
    },

    // -------------------------------------------------------------------------
    // INGLÉS (en)
    // -------------------------------------------------------------------------
    en: {
      // === PAGE & METADATA ===
      LOGIN_PAGE_TITLE: "Paycampesino Net Colombia - Online Banking",

      // === HEADER & NAVBAR (header-login) ===
      LOGIN_NAV_LOGO_ALT: "Paycampesino Logo",
      LOGIN_NAV_PERSONAS: "Personal",
      LOGIN_NAV_EMPRESAS: "Business",
      LOGIN_NAV_CERRAR: "Close",
      LOGIN_NAV_CERRAR_ARIA: "Close",
      LOGIN_NAV_URL_PERSONAS: "#",
      LOGIN_NAV_URL_EMPRESAS: "https://www.bbva.com.co/empresas.html",
      LOGIN_NAV_URL_CERRAR: "https://www.bbva.com.co/",

      // === SECURITY BAR (secure-bar-login) ===
      LOGIN_SECURE_BAR_TEXT: "You are in a secure Paycampesino environment",

      // === LOGIN FORM (content-login) ===
      LOGIN_FORM_TITLE: "Hello, log in to Paycampesino Net:",

      // Document types
      LOGIN_DOC_TYPE_CC: "Citizenship ID (CC)",
      LOGIN_DOC_TYPE_CE: "Foreigner ID (CE)",
      LOGIN_DOC_TYPE_TI: "Identity Card (TI)",
      LOGIN_DOC_TYPE_PP: "Passport",
      LOGIN_DOC_TYPE_NIP: "Personal ID Number (NIP)",
      LOGIN_DOC_TYPE_CV: "Temporary Residence Permit",

      // Document input
      LOGIN_INPUT_DOC_PLACEHOLDER: "Document number",
      LOGIN_ERROR_DOC_REQUIRED: "This field is required.",

      // Password input
      LOGIN_INPUT_PASS_PLACEHOLDER: "Password",
      LOGIN_ERROR_PASS_REQUIRED: "This field is required.",
      LOGIN_ARIA_PASS_SHOW: "Show password",
      LOGIN_ARIA_PASS_HIDE: "Hide password",

      // Buttons & links
      LOGIN_BTN_SUBMIT: "Log in",
      LOGIN_LINK_FORGOT_PASS: "Forgot your password?",
      LOGIN_URL_FORGOT_PASS: "https://nuevaversion.bbvanet.com.co/bbvaco/kqpu_co_web/page/forgetPassword",

      // === SIDE PROMO (content-login) ===
      LOGIN_PROMO_ALT: "Register",
      LOGIN_PROMO_TITLE: "Get started today with Paycampesino Net",
      LOGIN_PROMO_DESC: "Sign up to view your banking products online. You can also activate your Paycampesino App whenever needed.",
      LOGIN_PROMO_BTN: "Sign up",

      // === SECURITY TIPS CAROUSEL (content-login) ===
      LOGIN_TIP_1_TITLE: "Never share your details",
      LOGIN_TIP_1_DESC: "Your access passwords are strictly confidential. Never share them via email, SMS, or phone calls.",

      LOGIN_TIP_2_TITLE: "Beware of suspicious calls",
      LOGIN_TIP_2_DESC: "Do not return calls to unfamiliar phone numbers. Always reach us through Paycampesino official channels.",

      LOGIN_TIP_3_TITLE: "Never disclose your security codes",
      LOGIN_TIP_3_DESC: "Paycampesino will never ask for verification codes via SMS, email, or unexpected phone calls.",

      LOGIN_TIP_4_TITLE: "Protect your banking credentials",
      LOGIN_TIP_4_DESC: "Never type passwords or security codes into unknown links or third-party applications.",

      LOGIN_TIP_5_TITLE: "Notice anything unusual?",
      LOGIN_TIP_5_DESC: "If you shared credentials or notice unauthorized activity, contact our Paycampesino Helpline immediately.",

      LOGIN_TIPS_COUNTER: "3 of 5",

      // === FOOTER (footer-login) ===
      LOGIN_FOOTER_LOGO_ALT: "Paycampesino White Icon",
      LOGIN_FOOTER_FACEBOOK_TEXT: "Facebook",
      LOGIN_FOOTER_FACEBOOK_ARIA: "Paycampesino Colombia on Facebook",
      LOGIN_FOOTER_TWITTER_TEXT: "X (Twitter)",
      LOGIN_FOOTER_TWITTER_ARIA: "Paycampesino Colombia on X (Twitter)",
      LOGIN_FOOTER_LINKEDIN_TEXT: "LinkedIn",
      LOGIN_FOOTER_LINKEDIN_ARIA: "Paycampesino Colombia on LinkedIn",
      LOGIN_FOOTER_YOUTUBE_TEXT: "YouTube",
      LOGIN_FOOTER_YOUTUBE_ARIA: "Paycampesino Colombia on YouTube",

      LOGIN_FOOTER_SITEMAP: "Sitemap",
      LOGIN_FOOTER_SEGURIDAD: "Security",
      LOGIN_FOOTER_AVISO_LEGAL: "Legal Notice",
      LOGIN_FOOTER_POLITICAS: "Policies",
      LOGIN_FOOTER_REGLAMENTO: "Product Terms",
      LOGIN_FOOTER_COPYRIGHT: "© 2026 Paycampesino Colombia. Todos los derechos reservados.",

      // === SYSTEM MODALS & ALERTS ===
      // Modal: Access error
      LOGIN_MODAL_ACCESS_ERROR_TITLE: "Unable to sign in",
      LOGIN_MODAL_ACCESS_ERROR_DESC: "We could not validate your access. Please contact customer support or visit your nearest branch.",
      LOGIN_MODAL_ACCESS_ERROR_BTN: "Understood",

      // Modal: Service unavailable
      LOGIN_MODAL_UNAVAILABLE_ALT: "Service unavailable",
      LOGIN_MODAL_UNAVAILABLE_TITLE: "Service temporarily unavailable",
      LOGIN_MODAL_UNAVAILABLE_DESC: "We are currently experiencing system intermittence. Our team is working to resolve it as quickly as possible. We appreciate your patience. You may also use our Paycampesino Mobile App for more info at",
      LOGIN_MODAL_UNAVAILABLE_LINK: "https://bbva.com.co/personas/servicios-digitales/app-bbva.html",
      LOGIN_MODAL_UNAVAILABLE_BTN: "Understood",

      // Modal: Session expired
      LOGIN_MODAL_EXPIRED_TITLE: "Your session has expired",
      LOGIN_MODAL_EXPIRED_DESC: "We have closed your session due to inactivity for your security.",
      LOGIN_MODAL_EXPIRED_BTN: "Understood",

      // Indicators
      LOGIN_LOADING_TITLE: "Loading",
      LOGIN_LOADING_SUBTITLE: "Please wait a moment while we process your request.",
      LOGIN_COMPROBANTE_ARIA: "International transfer receipt",
      LOGIN_COMPROBANTE_PAGINACION: "1/1"
    }
  };

  // ===========================================================================
  // MOTOR DE RESOLUCIÓN Y DETECCIÓN DE IDIOMA
  // ===========================================================================
  function obtenerIdiomaActivo() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang && TEXTOS_LOGIN[urlLang]) {
        return urlLang;
      }
      const savedLang = localStorage.getItem("login_idioma_activo");
      if (savedLang && TEXTOS_LOGIN[savedLang]) {
        return savedLang;
      }
    } catch (e) {
      // Ignorar restricciones en entornos aislados
    }
    return IDIOMA_POR_DEFECTO;
  }

  // ===========================================================================
  // MOTOR DE APLICACIÓN RECURSIVO (LIGHT DOM + OPEN SHADOW DOM)
  // ===========================================================================
  function aplicarVariablesEnRaiz(rootNode, dict) {
    if (!rootNode) return;

    // 1. Elementos con data-i18n (reemplazo de texto directo)
    if (rootNode.querySelectorAll) {
      rootNode.querySelectorAll("[data-i18n]").forEach(function(el) {
        const key = el.getAttribute("data-i18n");
        if (dict[key] !== undefined) {
          el.textContent = dict[key];
        }
      });

      // 2. Elementos con data-i18n-html (reemplazo con HTML interno)
      rootNode.querySelectorAll("[data-i18n-html]").forEach(function(el) {
        const key = el.getAttribute("data-i18n-html");
        if (dict[key] !== undefined) {
          el.innerHTML = dict[key];
        }
      });

      // 3. Atributos: placeholder, title, aria-label, alt, value
      rootNode.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key] !== undefined) el.placeholder = dict[key];
      });

      rootNode.querySelectorAll("[data-i18n-title]").forEach(function(el) {
        const key = el.getAttribute("data-i18n-title");
        if (dict[key] !== undefined) el.title = dict[key];
      });

      rootNode.querySelectorAll("[data-i18n-aria]").forEach(function(el) {
        const key = el.getAttribute("data-i18n-aria");
        if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
      });

      rootNode.querySelectorAll("[data-i18n-alt]").forEach(function(el) {
        const key = el.getAttribute("data-i18n-alt");
        if (dict[key] !== undefined) el.alt = dict[key];
      });

      rootNode.querySelectorAll("[data-i18n-value]").forEach(function(el) {
        const key = el.getAttribute("data-i18n-value");
        if (dict[key] !== undefined) el.value = dict[key];
      });

      rootNode.querySelectorAll("[data-i18n-href]").forEach(function(el) {
        const key = el.getAttribute("data-i18n-href");
        if (dict[key] !== undefined) el.href = dict[key];
      });
    }

    // 4. Reemplazo recursivo de tokens {{VARIABLE}} en nodos de texto
    reemplazarTokensEnNodos(rootNode, dict);

    // 5. PENETRACIÓN EN SHADOW DOM: Inspeccionar hijos con shadowRoot abierto
    if (rootNode.querySelectorAll) {
      const allElements = rootNode.querySelectorAll("*");
      allElements.forEach(function(el) {
        if (el.shadowRoot) {
          aplicarVariablesEnRaiz(el.shadowRoot, dict);
        }
      });
    }
  }

  // Reemplazo recursivo de tokens {{CLAVE}} en nodos de texto
  function reemplazarTokensEnNodos(nodo, dict) {
    if (!nodo) return;
    if (nodo.nodeType === Node.TEXT_NODE) {
      const texto = nodo.nodeValue;
      if (texto && texto.indexOf("{{") !== -1) {
        nodo.nodeValue = texto.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g, function(match, key) {
          return dict[key] !== undefined ? dict[key] : match;
        });
      }
    } else if (nodo.nodeType === Node.ELEMENT_NODE) {
      const tag = nodo.tagName.toLowerCase();
      if (tag === "script" || tag === "style" || tag === "svg") return;
      for (let child = nodo.firstChild; child; child = child.nextSibling) {
        reemplazarTokensEnNodos(child, dict);
      }
    }
  }

  // Mapeos directos por selector específico para robustez total
  function aplicarMapeosDirectos(dict) {
    // Título de la página
    if (dict.LOGIN_PAGE_TITLE && document.title !== undefined) {
      document.title = dict.LOGIN_PAGE_TITLE;
    }

    // Raíz de componentes Web
    const customComponentTags = [
      "header-login",
      "secure-bar-login",
      "content-login",
      "footer-login",
      "login-page",
      "bbva-help-modal",
      "bbva-progress-content"
    ];

    customComponentTags.forEach(function(tagName) {
      document.querySelectorAll(tagName).forEach(function(comp) {
        if (comp.shadowRoot) {
          aplicarVariablesEnRaiz(comp.shadowRoot, dict);
        }
      });
    });
  }

  // Función principal de aplicación
  function aplicarVariablesLogin() {
    const lang = obtenerIdiomaActivo();
    const dict = TEXTOS_LOGIN[lang] || TEXTOS_LOGIN["es"];

    // 1. Título de página
    if (dict.LOGIN_PAGE_TITLE) {
      document.title = dict.LOGIN_PAGE_TITLE;
    }

    // 2. Aplicar en Light DOM
    if (document.body) {
      aplicarVariablesEnRaiz(document.body, dict);
    }

    // 3. Aplicar en componentes y Shadow Roots
    aplicarMapeosDirectos(dict);
  }

  // Función para cambiar idioma dinámicamente
  root.cambiarIdiomaLogin = function(nuevoIdioma) {
    if (TEXTOS_LOGIN[nuevoIdioma]) {
      try {
        localStorage.setItem("login_idioma_activo", nuevoIdioma);
      } catch (e) {}
      aplicarVariablesLogin();
      console.info("Idioma de login cambiado a: " + nuevoIdioma);
    } else {
      console.warn("Idioma no soportado en login: " + nuevoIdioma);
    }
  };

  // Helper de traducción: window.tLogin('VARIABLE', fallback)
  root.tLogin = function(key, fallback) {
    const lang = obtenerIdiomaActivo();
    const dict = TEXTOS_LOGIN[lang] || TEXTOS_LOGIN["es"];
    return dict[key] !== undefined ? dict[key] : (fallback || key);
  };

  // Exponer objeto de textos y funciones globalmente
  root.LOGIN_TEXTOS = TEXTOS_LOGIN;
  root.obtenerIdiomaLogin = obtenerIdiomaActivo;
  root.aplicarVariablesLogin = aplicarVariablesLogin;

  // Ejecución en el ciclo de vida del DOM
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function() {
        aplicarVariablesLogin();
        iniciarObservador();
      });
    } else {
      aplicarVariablesLogin();
      iniciarObservador();
    }
  }

  // Observador de mutaciones para componentes cargados o actualizados asíncronamente
  function iniciarObservador() {
    if (typeof MutationObserver === "undefined" || !document.body) return;
    let timeout = null;
    const observer = new MutationObserver(function() {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function() {
        aplicarVariablesLogin();
      }, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

})(typeof window !== "undefined" ? window : globalThis);
