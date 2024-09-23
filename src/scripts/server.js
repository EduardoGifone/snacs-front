// Importamos librerias necesarias
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS - Whitelist
app.use(
  cors({
    origin: "http://localhost:9000", // Asegúrate de que esta sea la URL de tu frontend
  })
);

const dominiosConfiables = [
  "rpp.pe",
  "www.bbc.com",
  "edition.cnn.com",
  "news.un.org",
  "www.nbcnews.com",
  "www.adinelsa.com.pe",
  "www.bn.com.pe",
  "www.gob.pe",
  "serviciosconida.com",
  "www.atd-quartmonde.org",
  "www.atd-cuartomundo.org",
  "european-union.europa.eu",
  "www.tv5monde.com",
  "www.info.gouv.fr",
  "www.gouv.bj",
  "www.usa.gov",
  "elcomercio.pe",
  "larepublica.pe",
  "peru21.pe",
  "gestion.pe",
];

// Función para verificar la confiabilidad de una URL
const verificarUrl = (url) => {
  const urlObject = new URL(url);
  const domain = urlObject.hostname;
  // Buscamos que este en la lista de los dominios confiables
  return { esConfiable: dominiosConfiables.includes(domain), fuente: domain };
};

// Endpoint para verificar la confiabilidad de una URL
app.post("/verificar-url", async (req, res) => {
  const { url } = req.body;

  // Aseguramos que la url no sea vacia
  if (!url) {
    return res.status(400).json({ error: "URL es requerida" });
  }

  // En caso de ser confiable devuelve verdadero
  try {
    const { esConfiable, fuente } = verificarUrl(url);
    return res.json({ url, confiable: esConfiable, fuente });
  } catch (error) {
    // En caso que la url sea invalida
    return res
      .status(500)
      .json({ error: "Por favor ingrese una URL/Link válida" });
  }
});

// Función para buscar el título en Google
const buscarTitulo = async (titulo) => {
  const query = encodeURIComponent(titulo);
  // Buscamos el titulo
  const url = `https://www.google.com/search?q=${query}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(response.data);
  const links = [];

  // Guardamos los links que esten relacionados con el titulo
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

  // Aseguramos que el titulo no sea vacio
  if (!titulo) {
    return res.status(400).json({ error: "Título es requerido" });
  }

  // Devolvemos verdadero en los links que son confiables
  try {
    const links = await buscarTitulo(titulo);
    const resultados = links.map((link) => ({
      url: link,
      confiable: verificarUrl(link).esConfiable,
      fuente: verificarUrl(link).fuente,
    }));

    return res.json({ titulo, resultados });
  } catch (error) {
    // En caso que el titulo sea invalido
    console.log(error);
    return res
      .status(500)
      .json({ error: "Por favor ingrese un título válido" });
  }
});

// Aperturamos el backend
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
