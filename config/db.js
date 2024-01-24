const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
      const DB_URI = process.env.DB_URI; // Obtener la URL de la base de datos a la que se debe conectar
      const dbName = 'AgroDB'; // Especificar el nombre de la base de datos aquí

      await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        dbName: dbName, // Especificar la base de datos aquí
      });

      console.log('**** CONEXION DB CORRECTA ****');
    } catch (err) {
      console.log('**** ERROR DE CONEXIÓN DB****', err);
    }
};

module.exports = dbConnect;
