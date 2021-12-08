import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { ToastContainer, toast } from 'react-toastify';
import RegistroProyectos from './RegistroProyectos';
import { Link } from "react-router-dom";
import ModalObj from 'components/ModalObj';
import ModalAvan from 'components/ModalAvan';
import PrivateComponent from 'components/PrivateComponent'
import {Enum_TipoObjetivo} from './../.././utils/enums'


const IndexProyectos = () => {

  const{data, error, loading}=useQuery(GET_PROYECTOS);


  
  const [show, setShow] = useState(false);


  useEffect(()=>{
    console.log('datos de los proyectos', data);
  }, [data]); 

  useEffect(()=>{
    if(error){
      toast.error('error consultando los proyectos')
    }
  },[error])

  if (loading) return <div>cargando</div>

  return (
  <div>
    <h2>Crear proyectos</h2>
    <table className='tabla'>
        <thead>
          <tr>
          
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>fechaInicio</th>
            <th>estado </th>
            <th>fase </th>
            <th>objetivos</th>
            <th>avances</th>
            <th>actualizar</th>
            <th>inscribirse</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyectos.map((u) => {
              {console.log('objetivos', u.objetivos)}
              return (
                
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.presupuesto}</td>
                  <td>{u.fechaInicio}</td>
                  <td>{u.estado}</td>
                  <td>{u.fase}</td>
               
                  <td key={u._id}><ModalObj id={`exampleModelObjetivos-${u._id}`} titulo="Objetivos" objetivos={u.
                    objetivos}></ModalObj>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#exampleModelObjetivos-${u._id}`}>
                    ver
                    </button>
                  </td>

                  <td key={u._id}><ModalAvan id={`exampleModalAvances-${u._id}`} titulo="Avances"  avances={u.avances}></ModalAvan>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#exampleModalAvances-${u._id}`}>
                    ver
                    </button>
                  </td>

                  <td><button type="button" class="btn btn-primary"> actualizar </button></td>
                  <td><button type="button" class="btn btn-primary"> inscripciones </button></td>
            
                </tr>
                
              );
              
            })}
        </tbody>
      </table>
      <Link to="/proyectos/RegistroProyectos" className="btn-general-cancelar mt-6 text-2xl">
              Registrar 
      </Link>
  </div>  
     
  )
};


export default IndexProyectos;
