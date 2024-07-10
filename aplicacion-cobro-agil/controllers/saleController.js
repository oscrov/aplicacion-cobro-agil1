const Sale = require('../models/sale');

// Controlador para registrar una venta
exports.createSale = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;

    const newSale = new Sale({
      productId,
      quantity,
      price
    });

    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener las ventas por día
exports.getSalesByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const sales = await Sale.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    }).populate('productId');

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
