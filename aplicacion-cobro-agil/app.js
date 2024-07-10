const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Importar el módulo path

const app = express();
const port = 3000;

// Configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/aplicacionCobroAgil', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Importar rutas de productos
const productRoutes = require('./routes/products');

// Importar rutas de ventas
const saleRoutes = require('./routes/sales');

// Usar rutas de productos
app.use('/products', productRoutes);

// Usar rutas de ventas
app.use('/sales', saleRoutes);

// Ruta para la pantalla ACM
app.get('/acm', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'acm.html'));
});

// Ruta para el formulario de cobro
app.get('/cobro', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cobro.html'));
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);

  // Ruta para el resumen de ventas por día
app.get('/resumen', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'resumen.html'));
  });
  
});
