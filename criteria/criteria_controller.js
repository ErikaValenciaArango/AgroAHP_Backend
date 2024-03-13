//const Criteria = require('./criteria_model');
const Criteria = require('./criteria_dao');
const mongoose = require('mongoose');

/**
 * Crea un nuevo criterio en la base de datos.
 * Los datos necesarios para crear el criterio se pasan a través del cuerpo de una solicitud POST.
 *
 * @param {Object} req El objeto de solicitud de Express. Se espera que contenga
 *                     los detalles del criterio en el cuerpo de la solicitud, incluyendo:
 *                     - criteria_name (String): El nombre del criterio, debe ser único.
 *                     - criteria_user (ObjectId): El ID del usuario asociado al criterio, supongo se obtiene del local storage :v.
 *                     - criteria_important1 (String): Primer aspecto importante del criterio.
 *                     - criteria_important2 (String): Segundo aspecto importante del criterio.
 *                     - criteria_important3 (String): Tercer aspecto importante del criterio.
 *                     - value1 (Number): Valor asociado al primer aspecto importante.
 *                     - value2 (Number): Valor asociado al segundo aspecto importante.
 *                     - value3 (Number): Valor asociado al tercer aspecto importante.
 *                     - percentage ([Number]): Un vector 3x1 que representa el porcentaje asociado a cada valor.
 * @param {Object} res El objeto de respuesta de Express. Se utiliza para enviar
 *                     la respuesta al cliente, que puede ser los detalles del criterio
 *                     creado o un mensaje de error si ocurre algún problema durante la creación.
 * @returns {Promise<void>} No retorna un valor directamente, pero maneja la respuesta
 *                          a través de los métodos del objeto `res`.
};*/

exports.createCriteria = async (req, res) => {
  const { criteria_name, criteria_user, criteria_important1, criteria_important2, criteria_important3, value1, value2, value3, percentage} = req.body;

  try {
    const newCriteria = await Criteria.create({
      criteria_name,
      criteria_user,
      criteria_important1,
      criteria_important2,
      criteria_important3,
      value1,
      value2,
      value3,
      percentage
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

/**
 * Obtiene todos los criterios asociados a un usuario específico.
 * El ID del usuario se pasa a través del cuerpo de una solicitud POST.
 *
 * @param {Object} req El objeto de solicitud de Express. Se espera que contenga
 *                     el ID del usuario (`criteria_user`) en el cuerpo de la solicitud.
 * @param {Object} res El objeto de respuesta de Express. Se utiliza para enviar
 *                     la respuesta al cliente. Esto puede ser una lista de criterios
 *                     asociados al usuario o un mensaje de error si no se encuentran
 *                     criterios o si ocurre algún error durante la operación.
 * @returns {Promise<void>} No retorna un valor directamente, pero maneja la respuesta
 *                          a través de los métodos del objeto `res`.
 */

exports.getCriteriaByUser = async (req, res) => {
  const criteriaUserId = req.body.criteria_user;

  if (!criteriaUserId) {
    console.log("No se proporcionó un criteria_user.");
    return res.status(400).send({ message: 'Es necesario especificar un criteria_user' });
  }

  try {
    const criteria = await Criteria.find({ criteria_user: criteriaUserId });

    if (!criteria || criteria.length === 0) {
      console.log(`No se encontraron criterios para el criteria_user: ${criteriaUserId}`);
      return res.status(404).send({ message: 'No se encontraron criterios para el criteria_user especificado' });
    } else {
      res.send(criteria);
    }
  } catch (err) {
    console.error('Error al obtener los criterios por criteria_user:', err);
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
