'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

 var cors = require('cors')
 app.use(cors())
 app.options('*', cors());

var persona_routes = require('./routes/personaRoute');
var autor_routes = require('./routes/autorRoute');

var libro_routes = require('./routes/libroRoute');
var prestamo_routes = require('./routes/prestamoRoute');
var usuario_routes = require('./routes/usuarioRoute');

const mongoose = require('mongoose')




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/api',persona_routes);
app.use('/api', autor_routes);
app.use('/api', libro_routes);
app.use('/api', prestamo_routes);
app.use('/api', usuario_routes);


mongoose.connect('mongodb+srv://duvanrosales:96737139a@cluster0.blwel.mongodb.net/Taller3?retryWrites=true&w=majority', (err, res) => 
{

    if(err){
        console.log("NO CONECTA")
    }
    app.listen(9000, () => {

        console.log("Esta corriendo en puerto 9000")
    })
})