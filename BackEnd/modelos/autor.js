'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutorSchema = Schema(
    {
      nombre:String,
      apellido:String,
      rut:String,
      edad:{type:Number}
      

    })

module.exports = mongoose.model('autor',AutorSchema)    