const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: Number, unique: true, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
