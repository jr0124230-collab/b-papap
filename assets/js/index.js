(function() {
  const structuredData = [
    "[{\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"VideoObject\",\n    \"name\": \"¿Cómo puedes redimir tus Puntos BBVA?\",\n    \"description\": \"Más momentos, más tranquilidad.  Cuando tengas una compra elegible, recibirás una notificación en tu App BBVA para que decidas si quieres pagarla con tus puntos,\",\n    \"uploadDate\": \"2026-08-31T01:03:00.000Z\",\n    \"thumbnailUrl\": \"http://i.ytimg.com/vi/i0UuDRl43Sw/hqdefault.jpg\",\n    \"embedURL\": \"//www.youtube.com/embed/i0UuDRl43Sw?enablejsapi=1&rel=0&showinfo=0z\"\n  }]",
    "{\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"BreadcrumbList\",\n    \"itemListElement\": [{\n      \"@type\": \"ListItem\",\n      \"name\": \"Personas\",\n      \"item\": \"https://www.bbva.com.co/personas.html\",\n      \"position\": 1\n    }, {\n      \"@type\": \"ListItem\",\n      \"name\": \"Tarjetas\",\n      \"item\": \"https://www.bbva.com.co/personas/productos/tarjetas.html\",\n      \"position\": 2\n    }, {\n      \"@type\": \"ListItem\",\n      \"name\": \"Puntos BBVA\",\n      \"item\": \"https://www.bbva.com.co/personas/productos/tarjetas/pago-con-puntos.html\",\n      \"position\": 3\n    }]\n  }"
  ];

  structuredData.forEach((data) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = data;
    document.head.appendChild(script);
  });
}());
