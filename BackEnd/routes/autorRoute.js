'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var autorController = require('../controllers/autorController');
// var autoController = require('../controllers/autoController');

// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/autor', autorController.guardar);
api.get('/autor', autorController.todos);
api.put('/autor/:id', autorController.modificar);
api.delete('/autor/:id', autorController.eliminar);

// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
