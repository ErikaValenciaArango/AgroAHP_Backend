'use strict'

require("dotenv").config() //Variables de entorno

const express = require("express");
const cors = require("cors");

//const estudianteRoutes = require('./Estudiantes/estudiante_routes');

/* Conexión con la db */
const dbConnect = require('./config/db')
dbConnect()


const app = express();
app.use(cors()); //Permite evitar el error de origen cruzado entre los navegadorees
const router = express.Router();
//app.use(express.static(path.join(dirname, 'build')));
//app.use(express.static(path.join(/home/fcserver/students, 'public')));

//require('./Estudiantes')(router);

const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
//const { path } = require("./Estudiantes/estudiante_model");

const multipartMiddleware = multipart({
  uploadDir: './public/repositorio'
});

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncode = bodyParser.urlencoded({extended:true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncode);


/**
 * Aquí invocamos a las rutas!
 */

//app.use("/api", require("./routes"))
app.use('/api', router);


//app.use(estudianteRouters); //Use las rutas que están enviandose desde ese archivo
//estudianteRoutes(router);


const port = process.env.PORT || 3002

app.listen(port, '0.0.0.0', () =>{
    console.log('El back está listo por http://localhost:' + port + ' :D');
  });


router.get('/pruebaServidor', (req, res) => {
  res.json({
    'url': `prueba`
  });
});


app.post('/tengohambre',(req,res)=>{
  console.log(req.body)
  res.status(200).send({message: 'Hola mundo, tengo hambre'})
})

app.use(router);
app.use(express.static('public'));
