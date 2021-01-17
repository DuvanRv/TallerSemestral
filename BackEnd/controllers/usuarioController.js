'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Usuario = require('../modelos/usuario.js');
const servicio = require('../servicios/token')
function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let user = new Usuario;
    user.mail = req.body.mail
    user.pass = req.body.pass

    user.save((err, usuariorstore) => {

        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ "mensaje":"creado correctamente" })

    })
}

function validar(req,res){
   
    Usuario.findOne({"mail":req.body.mail,"pass":req.body.pass},(err,usuario)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!usuario) return res.status(404).send({message:'Usuario o clave incorrecta'})
        res.status(200).send({ 'mensaje':'correcto','token':servicio.createToken(usuario)})
         
     })

}

function listarTodos(req,res){
    Usuario.find({},(err,usuarios)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        res.status(200).send({ 'mensaje':'correcto','data':usuarios})

    })
}

module.exports = {
    guardar,
    validar,
    listarTodos
};
