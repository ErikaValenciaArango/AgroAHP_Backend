const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
      const DB_URI = process.env.DB_URI; //obtener la URL de la base de datos a la que se debe conectar
      await mongoose.connect(DB_URI, {
        useNewUrlParser: true, //objeto de opciones con varias opciones para configurar la conexión
        useUnifiedTopology: true,
        autoIndex: true,
      });
      console.log('**** CONEXION DB CORRECTA ****');
    } catch (err) {
      console.log('**** ERROR DE CONEXIÓN DB****', err)

    }
  };

module.exports = dbConnect
