const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

// Habilitar CORS
app.use(cors());

// Habilitar express.json para parsear JSON
app.use(express.json());

// Conexion a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a la base de datos MongoDB');
});

// Rutas
const usuariosRutas = require('./Rutas/usuarios');
app.use('/usuarios', usuariosRutas);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
