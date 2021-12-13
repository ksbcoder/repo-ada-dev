import { useMutation } from "@apollo/client";
import { CREAR_PROYECTO } from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {InfoProyectos} from "./RegistroProyectos"
import { useUser } from "context/userContext";
import DropDown from "components/Dropdown";
import { Enum_TipoObjetivo } from "utils/enums";
import { nanoid } from 'nanoid'
import { ObjContext } from "context/objContext";
import { useObj } from "context/objContext";


const RegistroProyectos = () => {

  const {form, formData, updateFormData}=useFormData(null);

  const { userData } = useUser();
  console.log('id', userData._id, 'rol', userData.rol)

  const [crearProyecto, {data, loading, error}] = useMutation(CREAR_PROYECTO);
  
  const submitForm= (e)=>{
    e.preventDefault();
    formData.presupuesto=parseFloat(formData.presupuesto)
    formData.objetivos = Object.values(formData.objetivos);
    crearProyecto({
      variables:{...formData, lider:userData._id}
    });
    console.log('fd:', formData);
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
      {userData.rol == 'LIDER' ?
        <div>
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
          <Objetivos/>
     
          
          <div className="form-general">
              <button className="btn-general mt-4 text-xl">Registrar</button>
          </div>
        </div>: ""
      }
      {userData.rol=='ADMINISTRADOR' || userData.rol == 'ESTUDIANTE' ?
        <div>
          SOLO LOS LIDERES PUEDEN REGISTRAR PROYECTOS 
        </div>: ""  
      }
      </form>
    
  
    </div>
  );
};

const Objetivos = () =>{

  const [listaObjetivos, setListaObjetivos]=useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);


  const eliminarObjetivo=(id)=>{
    setListaObjetivos(listaObjetivos.filter((el)=> el.props.id !== id));
  };

  const componenteObjetivoAgregado = () =>{
    const id=nanoid();
    return <FormObjetivo key={id} id={id}/>;
  };

  useEffect(()=>{
    if(listaObjetivos.length>4){
      setMaxObjetivos(true)
    }
    else{
      setMaxObjetivos(false)
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{eliminarObjetivo}}>
    <div>
      <spam>Objetivos del proyecto</spam>
      {
        !maxObjetivos && (
          <i onClick = {()=> setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])} className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'></i>
        )
      }
      {listaObjetivos.map((u)=>{
        return u;
      })}
    </div>
    </ObjContext.Provider>
  );
}

const FormObjetivo = ({id})=>{
  const{eliminarObjetivo}=useObj();
  return (
    <div className="text-gray-700 flex">
    <label class="block mb-1" for="forms-labelOverInputCode">Descripcion</label>
    <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name={`nested||objetivos||${id}||descripcion`} placeholder="Regular input" />
    <DropDown
      name={`nested||objetivos||${id}||tipo`} 
      options={Enum_TipoObjetivo} 
      label='Tipo de objetivo' 
      required={true}>
    </DropDown>
    <i onClick = {()=>eliminarObjetivo(id)} className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 mt-6 cursor-pointer'></i>
  </div>
  )
  
}


export default RegistroProyectos;
