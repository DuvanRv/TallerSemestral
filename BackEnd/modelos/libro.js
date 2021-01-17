'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LibroSchema = Schema(
    {
      codigo:{type:String,require:true,unique:true},
      nombre:{type:String},
      autor: { type: Schema.ObjectId, ref: "autor" }

    })

module.exports = mongoose.model('libro',LibroSchema)    