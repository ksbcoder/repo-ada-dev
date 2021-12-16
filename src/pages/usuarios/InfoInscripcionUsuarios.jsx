import React, {useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { useUser } from 'context/userContext';
import { useQuery} from '@apollo/client';
import { OBTENER_INSCRIPCIONES_ESTUDIANTE } from 'graphql/inscripciones/queries';
import { GET_USUARIO } from 'graphql/usuarios/queries';


const InfoInscripcionUsuarios = () => {
    const { _id } = useParams();
    const{userData} = useUser();    

    console.log("El id es:"+_id);
    console.log("El rol del usuario es:"+userData.rol);
    const {data,
        error: queryError,
        loading: queryLoading,} = useQuery(OBTENER_INSCRIPCIONES_ESTUDIANTE, {
        variables: {estudianteId:_id},
    }); 
    
    useEffect(() => {
        if(data!= null){
            console.log("queryData : "+data.consultarInscripcionesPorEstudiante.length)
        }else{
            console.log("queryData : 0")
        }        
    }, [data])
   

    return (
        <><nav className="navbar">
            <h1>Información de Inscripción de Usuario a Proyectos</h1>
        </nav>
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link to='../usuarios/GestionUsuarios'>
            <i className='fas fa-chevron-circle-left text-blue-400 cursor-pointer font-bold text-xl hover:text-green-400' />
        </Link> 
            <div className="table-container">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>id Inscripcion</th>
                            <th>Estado Inscripcion</th>
                            <th>Id Proyecto</th>
                            <th>Nombre Proyecto</th>
                            <th>Id Lider</th> 
                        </tr>                                               
                    </thead>
                    <tbody>                        
                        {data != null && data.consultarInscripcionesPorEstudiante.map((u) =>{
                            return(
                                <tr key={u._id}>
                                    <td>{u._id}</td>
                                    <td>{u.estado}</td>
                                    <td>{u.proyecto._id}</td>
                                    <td>{u.proyecto.nombre}</td>
                                    <td>{u.proyecto.lider._id}</td>
                                </tr>
                            )
                        })}                      
                                               

                    </tbody>

                </table>
            </div>
        </div>      
        
        </>
    )
}

export default InfoInscripcionUsuarios
