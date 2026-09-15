(function() {
  const structuredData = [
    "{\n    \"@context\": \"http://www.schema.org\",\n    \"@type\": \"Organization\",\n    \"name\": \"Banco Bilbao Viscaya Argentaria de Colombia S.A.\",\n    \"url\": \"/personas.html\",\n    \"address\": {\n      \"@type\": \"PostalAddress\",\n      \"streetAddress\": \"Carrera 9 N 72 - 21\",\n      \"addressLocality\": \"Bogota\",\n      \"addressRegion\": \"Bogota\",\n      \"postalCode\": \"110221\",\n      \"addressCountry\": \"Colombia\"\n    },\n    \"contactPoint\": {\n      \"@type\": \"ContactPoint\",\n      \"telephone\": \"+57 01 8000 912 227\",\n      \"contactType\": \"servicio al cliente\"\n    },\n    \"sameAs\": []\n  }",
    "[{\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"VideoObject\",\n    \"name\": \"Iniciativas para transformar realidades\",\n    \"description\": \"Ver video\",\n    \"uploadDate\": \"2025-11-18T11:25:00.000Z\",\n    \"thumbnailUrl\": \"http://i.ytimg.com/vi/oiQlH3qJS2g/hqdefault.jpg\",\n    \"embedURL\": \"//www.youtube.com/embed/oiQlH3qJS2g?enablejsapi=1&rel=0&showinfo=0z\"\n  }, {\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"VideoObject\",\n    \"name\": \"Iniciativas para transformar realidades\",\n    \"description\": \"Descubre cómo estamos impulsando los sueños de 156 jóvenes becados que ya están en la universidad.\",\n    \"uploadDate\": \"2025-11-17T08:10:00.000Z\",\n    \"thumbnailUrl\": \"http://i.ytimg.com/vi/oiQlH3qJS2g/hqdefault.jpg\",\n    \"embedURL\": \"//www.youtube.com/embed/oiQlH3qJS2g?enablejsapi=1&rel=0&showinfo=0z\"\n  }]",
    "{\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"WebSite\",\n    \"name\": \"BBVA\",\n    \"url\": \"https://www.bbva.com.co\",\n    \"potentialAction\": {\n      \"@type\": \"SearchAction\",\n      \"target\": \"https://www.bbva.com.co/personas/buscador.html?_charset_=UTF-8&search={search_term_string}\",\n      \"query-input\": \"required name=search_term_string\"\n    }\n  }"
  ];

  structuredData.forEach((data) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = data;
    document.head.appendChild(script);
  });
}());
