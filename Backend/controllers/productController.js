// controllers
const Product = require("../models/productModel");

// Route to add a new product
exports.addProduct = async (req, res) => {
  try {
    const { id, name, price, category, image, description, usage } = req.body;

    const newProduct = new Product({
      id,
      name,
      price,
      category,
      image,
      description,
      usage,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route to get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route to get the list of products
exports.getProducts = async (req, res) => {
  try {
    const products = await Book.find();
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route to update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updateProduct = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updateProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route to delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Server error" });
  }
};
