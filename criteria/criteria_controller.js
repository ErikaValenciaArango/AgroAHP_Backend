//const Criteria = require('./criteria_model');
const Criteria = require('./criteria_dao');
const mongoose = require('mongoose');

// Crear un nuevo criterio
exports.createCriteria = async (req, res, next) => {
  const { compound, cost, environment_impact, availability } = req.body;

  const newCriteria = {
    compound,
    cost,
    environment_impact,
    availability,
  };

  try {
    // Intenta crear el nuevo criterio en la base de datos
    const criteria = await Criteria.create(newCriteria);

    // Si se crea exitosamente, envía una respuesta de éxito
    res.status(201).send({ message: 'Criterio creado exitosamente', criteria });
  } catch (err) {
    // Manejo de errores al crear el criterio
    console.error('Error al crear el criterio:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener todos los criterios
exports.getAllCriteria = async (req, res, next) => {
  try {
    const criteria = await Criteria.find();

    if (!criteria || criteria.length === 0) {
      return res.status(409).send({ message: 'No se encontraron criterios' });
    } else {
      res.send(criteria);
    }
  } catch (err) {
    return res.status(500).send('Error del Servidor');
  }
};

// Actualizar la información de un criterio
exports.updateCriteria = async (req, res) => {
  // Asumiendo que el ObjectId se envía como parte de la ruta o en el cuerpo de la solicitud
  const criteriaId = req.params.id || req.body.id; // Ajusta esto según cómo recibas el ID
  const criteriaNewData = {
    cost: req.body.cost,
    environment_impact: req.body.environment_impact,
    availability: req.body.availability,
  };

  try {
    const updateResult = await Criteria.updateOne(
      { _id: mongoose.Types.ObjectId(criteriaId) }, // Convertir el ID de string a ObjectId
      { $set: criteriaNewData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ message: 'Criterio no encontrado' });
    }

    res.json({ status: 'Información del criterio actualizada' });
  } catch (err) {
    console.error('Error al actualizar el criterio:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Eliminar un criterio
exports.deleteCriteria = async (req, res) => {
  const compound = req.body.compound;

  try {
    const deleteResult = await Criteria.deleteOne({ compound });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Criterio no encontrado' });
    }

    res.json({ message: 'Criterio Eliminado' });
  } catch (err) {
    res.status(500).send({ message: 'Error del Servidor' });
  }
};

// Controlador para eliminar un criterio por su ObjectId
exports.deleteCriteriaById = async (req, res) => {
  const criteriaId = req.params.criteriaId; // Suponiendo que el ObjectId se pasa como parámetro en la URL

  try {
    // Intenta eliminar el criterio por su ObjectId
    const deleteResult = await Criteria.deleteOne({ _id: criteriaId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Criterio no encontrado' });
    }

    res.json({ message: 'Criterio eliminado exitosamente' });
  } catch (err) {
    res.status(500).send('Error del Servidor');
  }
};
