var Prestamo = require('../modelos/prestamos.js');
var Persona = require('../modelos/persona.js');
var Autor = require('../modelos/autor.js');
function guardarPrestamo(req,res){

    let prestamos = new Prestamo()
    prestamos.persona=req.body.idPersona
    prestamos.libro=req.body.libro 
    prestamos.fecha = req.body.fecha 
    prestamos.save((err, prestamo) => {

        res.status(200).send({ registroInsertado: prestamo })

    })

  }

  function listar(req,res){
    Prestamo.find()
     .populate('libro')
     .populate('persona')
      .exec((err, resultado) => {
       res.status(200).send({ resultado })
     })
 }

 function prestamosPersona(req,res)
 {
  
  Prestamo.find()
  .populate('libro')
  .populate({
    path:'persona',
    select:'nombre',
    match: {rut:req.query.rut}
  })
   .exec((err, resultado) => {
     let final  = resultado.filter(item=> item.persona !=null);
     res.status(200).send({ final })
  })

 }

 async function prestamosPersona2(req,res)
 {
  //Descubrir el ID de la persona con el rut
  let PersonaBusqueda = await Persona.findOne({rut:req.query.rut});
 // res.status(200).send({ PersonaBusqueda })

 //{_id:221323,nombre}


  let resultado = await Prestamo.find({persona:PersonaBusqueda._id}).populate('libro');

    res.status(200).send({ resultado })


 }


 async function AutordePrestamos(req,res)
 {
  //1. Identificar una persona
  var resultadoFinal = []
  let PersonaBusqueda = await Persona.findOne({rut:req.query.rut});

  //2 Identificar los prestamos de una persona 
  let prestamos = await Prestamo.find({persona:PersonaBusqueda._id})
                  .populate('libro');

  //al hacer Populate del Libro obtendremos el codigo del autor
    //iteramos el resultado 
    for(let item of prestamos){    // for of en vez de for in
      let aut = await Autor.findOne({"_id" : item.libro.autor});
      resultadoFinal.push(aut);
    }


    res.status(200).send({ Autores:resultadoFinal })


 }

  function AutordePrestamos2(req,res){
    let rut = req.query.rut
    Prestamo.find({})
    .populate({
      path:'libro',
      select :'autor nombre codigo',
      populate:{
          path:'autor',
          select:'nombre'
      }
    })
    .populate({
      path:'persona',
      match:{'rut':rut},
      select:{}
    })
    .exec((err,prestamos)=>{
        if(err) res.status(500).send('No se encuentran prestamos al rut');

        res.status(200).send(prestamos.filter(item=>item.persona!=null))
    })
 }


  module.exports = {
    guardarPrestamo,
    listar,
    prestamosPersona,
    prestamosPersona2,
    AutordePrestamos,
    AutordePrestamos2
};
