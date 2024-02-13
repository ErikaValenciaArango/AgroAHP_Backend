const express = require('express');
const router = express.Router();
const CriteriaController = require('./criteria_controller');

// Rutas para criterios

module.exports = (router) => {
  router.post('/createCriteria', CriteriaController.createCriteria);
  router.get('/getAllCriteria', CriteriaController.getAllCriteria);
  router.post('/updateCriteria', CriteriaController.updateCriteria);
  router.post('/deleteCriteria', CriteriaController.deleteCriteria);
  router.post('/deleteCriteriaById', CriteriaController.deleteCriteriaById);
};
