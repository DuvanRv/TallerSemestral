'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var prestamo = require('../controllers/prestamoController');
const auth = require('../middlewares/auth')
// Llamamos al router
var api = express.Router();
 
//  Guardar Autos
api.post('/prestamo', prestamo.guardarPrestamo);
api.get('/prestamo',prestamo.listar);
api.get('/prestamopersona', prestamo.prestamosPersona);
api.get('/prestamopersona2', prestamo.prestamosPersona2);

api.get('/autorprestamo1', prestamo.AutordePrestamos);
api.get('/autorprestamo2',prestamo.AutordePrestamos2);


// Exportamos la configuración
module.exports = api;
