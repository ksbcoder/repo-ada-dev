import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';

const InfoProyectos = () => {
  const{data, error, loading}=useQuery(GET_PROYECTOS);

  useEffect(()=>{
    console.log('datos de los proyectos', data);
  }, [data]); 

  return (
  <div>
    <table className='tabla'>
        <thead>
          <tr>
          
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>fechaInicio</th>
            <th>lider ID</th>
    
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
           
            
                </tr>
              );
            })}
        </tbody>
      </table>

  </div>
  )
};

export default InfoProyectos;
