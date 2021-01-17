'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var autopersonaController = require('../controllers/autos_personaController');
 
// Llamamos al router
var api = express.Router();
 
//  Guardar Autos
api.post('/auto_persona', autopersonaController.guardarAuto_persona);
api.get('/auto_persona', autopersonaController.listar);

// Exportamos la configuración
module.exports = api;
