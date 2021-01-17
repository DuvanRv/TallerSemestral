'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var LibroController = require('../controllers/libroController');
 
// Llamamos al router
var api = express.Router();
 
//  Guardar 
api.post('/libro', LibroController.guardar);
api.get('/libroautor', LibroController.listarconAutor);
api.get('/libro', LibroController.listarAll)
// Exportamos la configuración
module.exports = api;

