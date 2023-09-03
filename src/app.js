const express = require("express")
const app = express()
const PORT = 8080
const fs = require("fs");

app.use(express.json());

app.get("/products", (req, res) => {
    const limit = req.query.limit;
    fs.readFile("src/productos.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).json({ error: "Error al leer el archivo de productos." });
        return;
      }
  
      const products = JSON.parse(data);
  
      if (limit) {
        res.json(products.slice(0, limit));
      } else {
        res.json(products);
      }
    });
  });

  app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    fs.readFile("src/productos.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).json({ error: "Error al leer el archivo de productos." });
        return;
      }
  
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === productId);
  
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Producto no encontrado." });
      }
    });
  });
  

app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto ${PORT}`);
})

