'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UsuarioSchema = Schema(
    {
     
      mail: {type:String,require:true,unique:true},
      pass:String
    })

module.exports = mongoose.model('usuario',UsuarioSchema)   