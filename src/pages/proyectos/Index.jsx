import { useMutation } from "@apollo/client";
import { CREAR_PROYECTO } from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {InfoProyectos} from "./InfoProyectos"


const IndexProyectos = () => {

  const {form, formData, updateFormData}=useFormData(null);

  const [crearProyecto, {data, loading, error}] = useMutation(CREAR_PROYECTO);
  
  const submitForm= (e)=>{
    e.preventDefault();
    console.log('fd:', formData);
    formData.presupuesto=parseFloat(formData.presupuesto)
    crearProyecto({
      variables:{...formData}
    });
  };

  useEffect(()=>{
    console.log('mutacion crear', data);
  }, [data]);

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>

      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Crear proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Nombre del proyecto</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="nombre" placeholder="Regular input" />
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Presupuesto</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="number" name="presupuesto" placeholder="Regular input" />
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Fecha de inicio</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="date" name="fechaInicio" placeholder="Regular input" />
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Estado</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="estado" placeholder="Regular input" />
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Fase</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="fase" placeholder="Regular input" />
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Lider</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="lider" placeholder="Regular input" />
      </div>
      
      <div className="form-general">
          <button className="btn-general mt-4 text-xl">Registrar</button>
      </div>
     
      </form>
    
  
    </div>
  );
};

export default IndexProyectos;
