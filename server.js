require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "EcoMap PP Backend" });
});

app.get("/api/google-places", async (req, res) => {
  try {
    const { lat, lon, radius = 2000 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Faltan parámetros lat/lon" });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey || apiKey === "PEGAR_ACA_TU_API_KEY") {
      return res.status(500).json({
        error: "Falta configurar GOOGLE_PLACES_API_KEY en el archivo .env"
      });
    }

    const params = new URLSearchParams({
      location: `${lat},${lon}`,
      radius: String(radius),
      keyword: "comercio tienda supermercado local negocio",
      key: apiKey
    });

    const googleUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params.toString()}`;
    const response = await fetch(googleUrl);
    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Error consultando Google Places",
      detail: error.message
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`EcoMap PP activo en http://localhost:${PORT}`);
  console.log("Google Places usa la API Key del archivo .env");
});
