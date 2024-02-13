const mongoose = require('mongoose');
const criteriaSchema = require('./criteria_model');

// Definir métodos estáticos en el modelo de criterios
criteriaSchema.statics = {
  create: function (data, cb) {
    // Crear una nueva instancia del modelo de criterios con los datos proporcionados
    const criteria = new this(data);
    // Guardar la instancia de criterios en la base de datos y ejecutar la función de devolución de llamada cb una vez que se completa la operación
    criteria.save(cb);
  },
  getAllCriteria: function (cb) {
    // Realizar una búsqueda en la base de datos para obtener todos los criterios y ejecutar la función de devolución de llamada cb una vez que se completa la operación
    this.find({}, cb);
  },
};

// Crear el modelo de criterios a partir del esquema de criterios
const Criteria = mongoose.model('Criteria', criteriaSchema);

module.exports = Criteria;
