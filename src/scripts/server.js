const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

const trustedDomains = [
  "rpp.pe",
  "www.bbc.com",
  "edition.cnn.com",
  "reuters.com",
  "news.un.org",
  "www.nbcnews.com",
];

// Función para verificar la confiabilidad de una URL
const verificarUrl = (url) => {
  const urlObject = new URL(url);
  const domain = urlObject.hostname;
  return trustedDomains.includes(domain);
};

// Endpoint para verificar la confiabilidad de una URL
app.post("/verificar-url", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL es requerida" });
  }

  try {
    const isTrusted = verificarUrl(url);
    return res.json({ url, confiable: isTrusted });
  } catch (error) {
    return res.status(500).json({ error: "Error al verificar la URL" });
  }
});

// Función para buscar el turlítulo en Google
const buscarTitulo = async (titulo) => {
  const query = encodeURIComponent(titulo);
  const url = `https://www.google.com/search?q=${query}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(response.data);
  const links = [];

  $("h3").each((index, element) => {
    const link = $(element).closest("a").attr("href");
    if (link) {
      // Extraer la URL real usando una expresión regular
      const match = link.match(/\/url\?q=(.*?)(?:&|$)/);
      if (match) {
        const realUrl = decodeURIComponent(match[1]);
        links.push(realUrl);
      }
    }
  });

  return links;
};

// Endpoint para verificar la confiabilidad de un título
app.post("/verificar-titulo", async (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: "Título es requerido" });
  }

  try {
    const links = await buscarTitulo(titulo);
    const resultados = links.map((link) => ({
      url: link,
      confiable: verificarUrl(link),
    }));

    return res.json({ titulo, resultados });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al verificar el título" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
