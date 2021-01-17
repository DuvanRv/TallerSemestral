'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Autor = require('../modelos/autor.js');

function guardar(req, res) {
    let autor = new Autor()
    autor.nombre = req.body.nombre
    autor.apellido = req.body.apellido
    autor.edad = req.body.edad
    autor.rut = req.body.rut

    autor.save((err, autorStore) => {

        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ autor: autorStore })

    })
}
function modificar(req, res) {


    Autor.findOneAndUpdate({_id:req.params.id}, {
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        edad : req.body.edad,
        rut :req.body.rut
     }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
       
            res.status(200).send({mensaje:"Modificado"})
        }
      });
    
    
}
function eliminar(req,res){
    Autor.findByIdAndDelete(req.params.id,function(err, result) {
        if (err) {
          res.send(err);
        } else {
       
            res.status(200).send({mensaje:"Eliminado"})
        }
      });
}

function todos(req, res) {

    Autor.find({},(err,autor)=>{
    if(!autor) return res.status(404).send({message:'Error la persona no existe'})

         res.status(200).send({autor})
     })
}
 

module.exports = {
    guardar,
   todos,
   modificar,
   eliminar
    
};
