'use strict'

require("dotenv").config() //Variables de entorno

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

// Conexión con la db
const dbConnect = require('./config/db')
dbConnect()

const app = express();
app.use(cors()); //Permite evitar el error de origen cruzado entre los navegadorees
const router = express.Router();

// Configuración del bodyParser y multipart
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncode = bodyParser.urlencoded({extended:true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncode);

// Definición de rutas
const userRoutes = require('./users/users_routes');
const criteriaRoutes = require('./criteria/criteria_routes');

// Aplicar rutas al app
userRoutes(app);
criteriaRoutes(app);

/*
const multipartMiddleware = multipart({
  uploadDir: './public/repositorio'
});*/


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

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    // Manejar ValidationError
    return res.status(400).json({ error: err.message });
  }
  // Manejar otros tipos de errores
  console.error(err);
  res.status(500).json({ error: 'Un error inesperado ocurrió.' });
});
