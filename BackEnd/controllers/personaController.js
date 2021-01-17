'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Persona = require('../modelos/persona.js');

// Creamos un método en el controlador, en este caso una accion de pruebas
function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let persona = new Persona()
    persona.nombre = req.body.nombre
    persona.apellido = req.body.apellido
    persona.edad = req.body.edad
    persona.rut = req.body.rut
    persona.phone = req.body.telefonos
    persona.sexo = req.body.sexo
    persona.save((err, personastore) => {

        if (err) return res.status(401).send(`Error base de datos> ${err}`)

        res.status(200).send({ persona: personastore })

    })
}

function buscar(req, res) {

    //    let nombrereq = req.params.nombre

    //params ->viene en la ruta sin nombre de paramertro ej persona/1 
    //query viene con un nombre de parametro en forma de get
    let nombrereq = req.query.nombre
    let rutreq = req.query.rut
    console.log(rutreq);
    Persona.find({ nombre: nombrereq, rut: rutreq }, (err, persona) => {
        if (!persona) return res.status(404).send({ message: 'Error persona no existe' })
        res.status(200).send({ persona })
    })


}
function buscarPorID(req, res) {

    let idpersona = req.params.id
    Persona.findById(idpersona,(err,persona)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!persona) return res.status(404).send({message:'Error la persona no existe'})

         res.status(200).send({persona})
     })
}

function todos(req, res) {

    Persona.find({},(err,persona)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!persona) return res.status(404).send({message:'Error la persona no existe'})

         res.status(200).send({persona})
     })
}


// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    guardar,
    buscar,
    buscarPorID,todos
    
};
