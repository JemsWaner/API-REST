const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/usuarios", (req, res) => {
  const data = JSON.parse(fs.readFileSync("surveyData.json", "utf8"));
  res.json(data.usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("surveyData.json", "utf8"));
  const { id } = req.params;
  data.usuarios.forEach((element) => {
    if (element.id == id) {
      res.json(element);
    }
  });
});

app.post("/usuarios", (req, res) => {
  const data = JSON.parse(fs.readFileSync("surveyData.json", "utf8"));
  const nuevoUsuario = req.body;
  data.usuarios.push(nuevoUsuario);
  fs.writeFileSync("surveyData.json", JSON.stringify(data, null, 2));
  res.status(201).json(nuevoUsuario);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
