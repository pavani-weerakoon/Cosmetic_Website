const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors());
// In-memory database
let products = [];
let nextId = 1;

// Helper function to find product index
const findProductIndex = (id) =>
  products.findIndex((p) => p.id === parseInt(id));

// POST /products to CREATE a new product
app.post("/products", (req, res) => {
  const { name, price, category, image, description, usage } = req.body;

  // Validate incoming data
  if (!name || !price || !category || !image) {
    return res.status(400).send("Missing required product fields");
  }

  const newProduct = {
    id: nextId++,
    name,
    price,
    category,
    image,
    description,
    usage,
  };
  products.push(newProduct);

  res.status(201).send(newProduct);
});

// GET /products to RETRIEVE all products
app.get("/products", (req, res) => {
  res.send(products);
});

// GET /products/:id to RETRIEVE a single product
app.get("/products/:id", (req, res) => {
  const productIndex = findProductIndex(req.params.id);

  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  res.send(products[productIndex]);
});

// PUT /products/:id to UPDATE a product
app.put("/products/:id", (req, res) => {
  const productIndex = findProductIndex(req.params.id);

  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  const { name, price, category, image, description, usage } = req.body;
  const updatedProduct = {
    ...products[productIndex],
    name,
    price,
    category,
    image,
    description,
    usage,
  };

  products[productIndex] = updatedProduct;

  res.send(updatedProduct);
});

// DELETE /products/:id to DELETE a product
app.delete("/products/:id", (req, res) => {
  const productIndex = findProductIndex(req.params.id);

  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  products = products.filter((p) => p.id !== parseInt(req.params.id));

  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
