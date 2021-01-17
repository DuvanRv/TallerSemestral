import React, { useState, useEffect } from 'react';
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
  delete: {
    backgroundColor: "red"
  }

}));

export default function Libro() {
  const classes = useStyles();

  const { register, handleSubmit, errors, getValues, setValue, reset } = useForm(
    { defaultValues: { cod_libro: "",nombre: "", autor: ""  } });

  const [libros, setLibros] = useState([])
  const [accion, setAccion] = useState("Guardar")
  const [idLibro, setIdLibro] = useState(null);

  const [autorSeleccionado, setAutorSeleccionado] = useState(0);
  const [autores,setAutores] = useState([])
  

  useEffect(() => {
    cargarLibro();
    cargarAutores()
  }, []);

  function cargarAutores()
  {
    axios.get("http://localhost:9000/api/autor").then(
      (response) => {
        setAutores(response.data.autor);
        //console.log(response.data);
      },
      (error) => {
       alert("error");
      }
    );
  }

  const ModificaAutorSeleccionado = (event) => {
    setAutorSeleccionado(event.target.value);
    //console.log(event.target.value);
  };
  
  const columns = [
    
    {
      name: 'Codigo del libro',
      field: 'codigo'
    },
    {
      name: 'Nombre',
      field: 'nombre'
    },
    {
      name: 'Autor',
      field: 'autor'
    }

  ];


  const options = {
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

  //console.log(autorSeleccionado);
  const onSubmit = (data) => {

    axios
        .post("http://localhost:9000/api/libro", 
        {
            codigo:data.codigo,
            nombre: data.nombre,
            idautor: autorSeleccionado
        })
        .then(
          (response) => {
            if (response.status == 200) {
              alert("Registro ok")
              cargarAutores();
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
  

  const cargarLibro = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/libro");
    console.log(data.libroConAutor);
    setLibros(data.libroConAutor.map((obj)=>{
      return {
        codigo: obj.codigo,
        nombre: obj.nombre,
        autor: obj.autor.nombre,
      }
    }));

  };
//  console.log(autores);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        
          <Typography component="h1" variant="h5">
            Registrar Libro
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="codigo"
                name="codigo"
                variant="outlined"
                required
                fullWidth
            
                label="Codigo del Libro"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nombre"
                name="nombre"
                variant="outlined"
                required
                fullWidth
            
                label="Nombre"
                autoFocus
                inputRef={register}
              />
            </Grid>
          
          <Grid item xs={12} sm={6}>
          <Select
              onChange={ModificaAutorSeleccionado}
              value={autorSeleccionado}
              labelWidth={"Autor"}
              margin="dense"
              placeholder={"Autores"}
              >
              <MenuItem selected={true} key={1} value={0}>
                Seleccione Autor
              </MenuItem>

              {autores.length > 0 ? (
              autores.map((item, index) => {
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
          </Grid>
          </Grid>
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

              title={"Libros"}
              data={libros}
              columns={columns}
              options={options}
            />
          </Grid>

          


        </form>


      </div>

    </Container>
  );
}