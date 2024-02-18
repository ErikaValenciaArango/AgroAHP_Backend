//const Criteria = require('./criteria_model');
const Criteria = require('./criteria_dao');
const mongoose = require('mongoose');

// Crear un nuevo criterio
exports.createCriteria = async (req, res) => {
  const { criteria_name, criteria_user, criteria_important1, criteria_important2, criteria_important3, value1, value2, value3 } = req.body;

  try {
    const newCriteria = await Criteria.create({
      criteria_name,
      criteria_user,
      criteria_important1,
      criteria_important2,
      criteria_important3,
      value1,
      value2,
      value3
    });

    return res.status(201).json({ message: 'Criterio creado exitosamente', data: newCriteria });
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    } else {
      console.error('Error al crear el criterio:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
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

exports.getCriteriaById = async (req, res) => {
  const criteriaId = req.body.id;

  try {
    const criteria = await Criteria.findById(criteriaId);

    if (!criteria) {
      return res.status(404).send({ message: 'Criterio no encontrado' });
    }

    res.json(criteria);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send({ message: 'ID no válido' });
    }

    console.error('Error al obtener el criterio:', err);
    res.status(500).send({ message: 'Error del Servidor' });
  }
};

exports.updateCriteria = async (req, res) => {
  const criteriaId = req.body.id;
  const criteriaNewData = {
    criteria_name: req.body.criteria_name,
    criteria_user: req.body.criteria_user,
    criteria_important1: req.body.criteria_important1,
    criteria_important2: req.body.criteria_important2,
    criteria_important3: req.body.criteria_important3,
    value1: req.body.value1,
    value2: req.body.value2,
    value3: req.body.value3
  };

  try {
    const updateResult = await Criteria.updateOne(
      { _id: criteriaId },
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

exports.deleteCriteria = async (req, res) => {
  const criteriaId = req.body.id;

  try {
    const deleteResult = await Criteria.deleteOne({ _id: criteriaId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Criterio no encontrado' });
    }

    res.json({ message: 'Criterio eliminado' });
  } catch (err) {
    console.error('Error al eliminar el criterio:', err);
    res.status(500).send({ message: 'Error del Servidor' });
  }
};
