const mongoose = require('mongoose');
const userSchema = require('./users_model');

// Definir métodos estáticos en el modelo de usuario
userSchema.statics = {
  create: function (data, cb) {
    // Crear una nueva instancia del modelo de usuario con los datos proporcionados
    const user = new this(data);
    // Guardar la instancia de usuario en la base de datos y ejecutar la función de devolución de llamada cb una vez que se completa la operación
    user.save(cb);
  },
  login: function (query, cb) {
    // Realizar una búsqueda en la base de datos de acuerdo con la consulta proporcionada y ejecutar la función de devolución de llamada cb una vez que se completa la operación
    this.find(query, cb);
  },
};

// Crear el modelo de usuario a partir del esquema de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
