import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { ToastContainer, toast } from 'react-toastify';

const InfoProyectos = () => {
  const{data, error, loading}=useQuery(GET_PROYECTOS);

  useEffect(()=>{
    console.log('datos de los proyectos', data);
  }, [data]); 

  useEffect(()=>{
    if(error){
      toast.error('error consultando los usuarios')
    }
  },[error])
  
  return (
  <div>
    <table className='tabla'>
        <thead>
          <tr>
          
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>fechaInicio</th>
            <th>lider ID</th>
            <th>objetivos ID</th>
            <th>avances ID</th>
    
    
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyectos.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.presupuesto}</td>
                  <td>{u.fechaInicio}</td>
                  <td>{u.lider._id}</td>
                  <td>{u.objetivos._id}</td>
                  <td>{u.avances._id}</td>
           
            
                </tr>
              );
            })}
        </tbody>
      </table>

  </div>
  )
};

export default InfoProyectos;
