'use strict'

require("dotenv").config() // Variables de entorno
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

// Conexión con la db
const dbConnect = require('./config/db');
dbConnect();

const app = express();
app.use(cors()); // Permite evitar el error de origen cruzado entre los navegadores

// Configuración del bodyParser y multipart
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//const multipartMiddleware = multipart({ uploadDir: './public/repositorio' });

// Definición de rutas
const userRoutes = require('./users/users_routes');
const criteriaRoutes = require('./criteria/criteria_routes');

// Aplicar rutas al app
userRoutes(app);
criteriaRoutes(app);

// Rutas adicionales
app.post('/tengohambre', (req, res) => {
  console.log(req.body);
  res.status(200).send({message: 'Hola mundo, tengo hambre'});
});

// Configuración del puerto
const port = process.env.PORT || 3002;
app.listen(port, '0.0.0.0', () => {
    console.log('El back está listo por http://localhost:' + port + ' :D');
});

// Servir archivos estáticos
app.use(express.static('public'));
