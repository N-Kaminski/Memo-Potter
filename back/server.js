const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const filePath = path.join(__dirname, "partidas.json"); //ruta para guardar partidas

// FUNCION PARA CARGAR PARTIDAS DESDE PARTIDAS.JSON
const cargarPartidas = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8"); //lee json departidas
    return JSON.parse(data); //lo parseo a objeto
  } catch (error) {
    console.error("Error al cargar partidas:", error);
    return [];
  }
};

// FUNCION PARA GUARDAR PARTIDAS EN PARTIDAS.JSON
const guardarPartidas = (partidas) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2)); //convierto el objeto a json y lo guardo
  } catch (error) {
    console.error("Error al guardar partidas:", error);
  }
};

let partidas = cargarPartidas(); // Carga las partidas al iniciar el servidor

app.use(express.static("../front"));
app.use(express.json());

// RUTAS AL SERVIDOR:

// FUNCION PARA OBTENER PERSONAJES
app.get("/api/characters", async (req, res) => {
  try {
    const response = await fetch("https://hp-api.onrender.com/api/characters"); //traigo personajes
    const characters = await response.json();
    const charactersFiltrados = characters
      .filter((char) => char.image)
      .slice(0, 15); // Filtro personajes con imagen y selecciono 15
    res.json(charactersFiltrados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener personajes" });
  }
});

// FUNCION PARA GUARDAR PARTIDAS
app.post("/api/guardar", (req, res) => {
  const { nombre, apellido, email, movimientos, tiempo, aciertos } = req.body;
  if (!nombre || !apellido || !email || !movimientos || !tiempo || !aciertos) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  } //verifico que esten todos los campos
  partidas.push({ nombre, apellido, email, movimientos, tiempo, aciertos });
  guardarPartidas(partidas); // Guardar las partidas en el archivo despues de cada modificacion
  res.json({ message: "Partida guardada" });
});

// FUNCION PARA OBTENER LAS 20 PARTIDAS
app.get("/api/posiciones", (req, res) => {
  const topPartidas = partidas
    .sort((a, b) => a.movimientos - b.movimientos || a.tiempo - b.tiempo) //ordeno partida por movimiento y tiempo
    .slice(0, 20);
  res.json(topPartidas); //parseo a json y envio
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
