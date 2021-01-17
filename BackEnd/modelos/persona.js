'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonaSchema = Schema(
    {
      nombre:String,
      apellido:String,
      rut:{type:String,require:true,unique:true},
      edad:{type:Number, min: 5},
      phone: {
        type: String
        },
      sexo: {
        type: String,
        enum: ['H','M'],
        required: true

     }
      
    })

module.exports = mongoose.model('personas',PersonaSchema)    

