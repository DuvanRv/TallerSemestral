import React, { useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MaterialDatatable from "material-datatable";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  
  },
  delete : {
    backgroundColor:"red"
  }

}));


const columns = [
  {
    name: 'Libro',
    field: 'libro'
  },
  {
    name: 'Persona',
    field: 'persona'
  },
  {
    name: 'Fecha',
    field: 'fecha'
  }
];


export default function Usuario() {
  const classes = useStyles();

  const { register, handleSubmit, errors,getValues,setValue,reset } = useForm(
    {defaultValues:{idPersona:"",libro:"",fecha:"2021-01-16"}});
  
  
  const [prestamos, setPrestamos] = useState([])
  const [accion,setAccion]= useState("Guardar")
  const [idPrestamo,setIdPrestamo] = useState(null);

  const [libroSeleccionado, setLibroSeleccionado] = useState(0);
  const [libros,setLibros] = useState([])

  const [personaSeleccionado, setPersonaSeleccionado] = useState(0);
  const [personas,setPersonas] = useState([])

  useEffect(() => {
    cargarPrestamo();
    cargarPersonas();
    cargarLibros();
  }, []);

  const ModificaLibroSeleccionado = (event) => {
    setLibroSeleccionado(event.target.value);
  };

  const ModificaPersonaSeleccionado = (event) => {
    setPersonaSeleccionado(event.target.value);
  };

  const options={
    selectableRows: false,
    print: false,
    onlyOneRowCanBeSelected: false,
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encuentran registros",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
    },
    download: false,
    pagination: true,
    rowsPerPage: 5,
    usePaperPlaceholder: true,
    rowsPerPageOptions: [5, 10, 25],
    sortColumnDirection: "desc",
  }
  const onSubmit = data => {

    if(accion=="Guardar"){
      axios
      .post("http://localhost:9000/api/prestamo",{

          libro: libroSeleccionado,
          idPersona: personaSeleccionado,
          fecha: "2021-01-16"
      })
      .then(
        (response) => {
          if (response.status == 200) {
            alert("Registro ok")
            cargarPrestamo();
            cargarPersonas();
            cargarLibros();
            reset();
          }
        },
        (error) => {
          // Swal.fire(
          //   "Error",
          //   "No es posible realizar esta acción: " + error.message,
          //   "error"
          // );
        }
      )
      .catch((error) => {
        // Swal.fire(
        //   "Error",
        //   "No cuenta con los permisos suficientes para realizar esta acción",
        //   "error"
        // );
        console.log(error);
      });
    }

  }


  const cargarPrestamo = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/prestamo");
    console.log(data);
    setPrestamos(data.resultado.map((obj)=>{
      return {
        fecha: obj.fecha,
        libro: obj.libro.nombre,
        persona: obj.persona.nombre
      }
    }));
    
  };


function cargarPersonas()
{

    axios.get("http://localhost:9000/api/personas").then(
      (response) => {
        setPersonas(response.data.persona);
        console.log(response.data);
      },
      (error) => {
       alert("error");
      }
    );
}


function cargarLibros()
{

    axios.get("http://localhost:9000/api/libro").then(
      (response) => {
        setLibros(response.data.libroConAutor);
        console.log(response.data);
      },
      (error) => {
       alert("error");
      }
    );
}

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
      
        <Typography component="h1" variant="h5">
            Registrar Prestamo
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fecha"
                label="Fecha"
                name="fecha"
                autoComplete="fecha"
                inputRef={register}
              />
            </Grid>  
          </Grid>
          <br></br>
          <Select
              onChange={ModificaLibroSeleccionado}
              value={libroSeleccionado}
              labelWidth={"Libro"}
              margin="dense"
              placeholder={"Libros"}
              >
              <MenuItem selected={true} key={1} value={0}>
                Seleccione Libro
              </MenuItem>

              {libros.length > 0 ? (
              libros.map((item, index) => {
              return (
              <MenuItem key={index} value={item._id}>
              <em>{item.nombre}</em>
              </MenuItem>
              );
              })
              ) : (
              <MenuItem key={-1} value={0}>
              <em>''</em>
              </MenuItem>
              )}
          </Select>
          <h1>   </h1>
          <Select
              onChange={ModificaPersonaSeleccionado}
              value={personaSeleccionado}
              labelWidth={"Persona"}
              margin="dense"
              placeholder={"Personas"}
              >
              <MenuItem selected={true} key={1} value={0}>
                Seleccione Persona
              </MenuItem>

              {personas.length > 0 ? (
              personas.map((item, index) => {
              return (
              <MenuItem key={index} value={item._id}>
              <em>{item.nombre}</em>
              </MenuItem>
              );
              })
              ) : (
              <MenuItem key={-1} value={0}>
              <em>''</em>
              </MenuItem>
              )}
          </Select>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {accion}
          </Button>

          
          <Grid container spacing={1}>
            <MaterialDatatable
        
              title={"Prestamos"}
              data={prestamos}
              columns={columns}
              options={options}
            />
          </Grid>
  
        
        </form>


      </div>

    </Container>
  );
}