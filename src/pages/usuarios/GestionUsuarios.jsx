import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { GET_USUARIOS_ESTUDIANTES} from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';

const GestionUsuarios = () => {
    const{userData} = useUser();    

    console.log("Usuario rol:" + userData.rol);
    let peticion1 = GET_USUARIOS; 
    let peticion2 = GET_USUARIOS_ESTUDIANTES;
          
  
    
    const{data,error,loading} = useQuery(userData.rol == "ADMINISTRADOR" ? peticion1: peticion2);  
    

    useEffect(() => {
        console.log("data servidor",data)        
    }, [data])

    useEffect(() => {
        if(error){
            toast.error('Error al consultar los usuarios');
        }
     }, [error])

    if(loading){ return <div>Cargando</div>
    }

    



    return (
        <><nav className="navbar">
            <h1>Gestión de Usuarios</h1>
        </nav>
            <div className='flew flex-col w-full h-full items-center justify-center p-10'>            
            <div className="table-container">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Identificación</th>
                            <th>Tipo de Usuario</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>                                                
                        {(userData.rol == "ADMINISTRADOR") && data &&
                            data.Usuarios.map((u) => {
                            return(
                                <tr key={u._id}>
                                    <td>{u.nombre}</td>
                                    <td>{u.apellido}</td>
                                    <td>{u.identificacion}</td>
                                    <td>{u.rol}</td>
                                    <td>{u.correo}</td>                                  
                                    <td>{u.estado}</td>
                                    <td className="flex">
                                        <Link className="btn-editar" to={`/usuarios/editar/${u._id}`} ><i className="fas fa-user-edit"></i></Link>
                                        {u.rol =='ESTUDIANTE'? <Link className="btn-project" to={`/usuarios/infoInscripcionUsuario/${u._id}`} ><i className="fas fa-project-diagram"></i></Link>:<span/> }                                            
                                    </td>
                                </tr>
                            )
                        })}
                        {(userData.rol == "LIDER") && data &&
                            data.UsuariosEstudiantes.map((u) => {
                            return(
                                <tr key={u._id}>
                                    <td>{u.nombre}</td>
                                    <td>{u.apellido}</td>
                                    <td>{u.identificacion}</td>
                                    <td>{u.rol}</td>
                                    <td>{u.correo}</td>                                  
                                    <td>{u.estado}</td>
                                    <td className="flex">
                                        <Link className="btn-editar" to={`/usuarios/editar/${u._id}`} ><i className="fas fa-user-edit"></i></Link>
                                        <Link className="btn-project" to={`/usuarios/infoInscripcionUsuario/${u._id}`} ><i className="fas fa-project-diagram"></i></Link>                                  
                                        
                                    </td>
                                </tr>
                            )
                        })} 
                                               
                    </tbody>

                </table> 
                
                

            </div>
            </div></>
      
    );
};

export default GestionUsuarios
