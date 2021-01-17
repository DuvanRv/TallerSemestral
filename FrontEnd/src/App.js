import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
export default function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data =>{

    //Enviar la data a la API
    console.log(data);

    axios 
    .post("http://localhost:9000/api/usuario/validar", data)
    .then(
      (response) => {
        if(response.status==200)
        {
          alert("Registro ok")
          console.log(response.data)
        }
      },
      (error) => {
        alert("error:"+error)
      }
    )
    .catch((error) => {
    
      console.log(error);
    });
  } 
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="mail" name="mail" ref={register} />
      <input type="text" placeholder="password" name="pass" ref={register} />

      <input type="submit" />
    </form>
  );
}