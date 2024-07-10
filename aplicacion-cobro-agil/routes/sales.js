const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Ruta para registrar una venta
router.post('/create', saleController.createSale);

// Ruta para obtener las ventas por día
router.get('/', saleController.getSalesByDate);

module.exports = router;
