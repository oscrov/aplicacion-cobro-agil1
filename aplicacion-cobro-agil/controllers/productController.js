const Product = require('../models/product');

// Controlador para crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { description, price } = req.body;

    // Generar un código único para el producto
    const lastProduct = await Product.findOne().sort({ code: -1 });
    const newCode = lastProduct ? lastProduct.code + 1 : 1;

    const newProduct = new Product({
      description,
      price,
      code: newCode
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
