const express = require('express');
const router = express.Router();

const UserController = require('./users_controller');

// Rutas para usuarios
module.exports = (router) => {
  router.post('/createUser', UserController.createUser);
  router.post('/loginUser', UserController.loginUser);
  router.get('/getAllUsers', UserController.getAllUsers);
  router.post('/getUserByNickname', UserController.getUserByNickname);
  router.post('/updateUser', UserController.updateUser);
  router.post('/deleteUser', UserController.deleteUser);
  //router.get('/connectionWithApp', UserController.connectionWithApp);
};
