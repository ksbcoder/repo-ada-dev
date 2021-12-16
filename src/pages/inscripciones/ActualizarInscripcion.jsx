import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { OBTENER_INSCRIPCION} from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
import { RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import DropDown from 'components/Dropdown';
import { useUser } from 'context/userContext';
import ReactLoading from "react-loading";

const ActualizarInscripcion = () => {
       
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const{userData} = useUser();  

    console.log("el id es:"+_id)

    //Query de Inscripcion

    const {
        data: dataInscripcion,
        error: errorInscripcion,
        loading: loadingInscripcion,
        refetch: refetchInscripcion,
    } = useQuery(OBTENER_INSCRIPCION, {
        variables: { id:_id },
    });

    useEffect(() => {
        refetchInscripcion();    
    }, [refetchInscripcion]);

    useEffect(() => {
       console.log("los datos son: "+dataInscripcion)
    }, [dataInscripcion])

    useEffect(() => {
        if(errorInscripcion){
            toast.error('Error al consultar la inscripción');
        }
    }, [errorInscripcion])

    if (loadingInscripcion) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <ReactLoading
                type="spinningBubbles"
                color="#7fffd4"
                height={150}
                width={150}
                />
            </div>
        );
    }

    //Mutación de Inscripción

    // const [AprobarInscripcion, { data: mutationData,  error: mutationError , loading: mutationLoading}] =
    // useMutation(APROBAR_INSCRIPCION);

     const submitForm = (e) => {
    //     e.preventDefault();        
    //     AprobarInscripcion({
    //     variables: { id:_id },
    //     });
     };

    // useEffect(() => {
    //     if (mutationData) {
    //     toast.success('Inscripción modificada correctamente');
    //     }
    // }, [mutationData]);

    // useEffect(() => {
    //     if (mutationError) {
    //     toast.error('Error modificando la inscripción');
    //     }       
    // }, [mutationError]);

    // if (queryLoading) return <div>Cargando....</div>;

    //************************************************** */

    if (userData.rol === "LIDER" || userData.rol === "ADMINISTRADOR") {
        return(
            <><nav className="navbar">
                <h1>Inscripciones</h1>
            </nav>
            <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='../inscripciones'>
                <i className='fas fa-chevron-circle-left text-blue-400 cursor-pointer font-bold text-xl hover:text-green-400' />
            </Link>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='flex flex-col items-center justify-center'
            >
                <Input
                    label='Id:'
                    type='text'
                    name='_id'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0]._id}
                    required={true}
                    isDisabled={true}/>
                <Input
                    label='Estado:'
                    type='text'
                    name='estado'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0].estado}
                    required={true} 
                    isDisabled={true}/>
                <Input
                    label='Fecha Inscripcion:'
                    type='text'
                    name='fechaInscripcion'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0].fechaInscripcion}
                    required={true} 
                    isDisabled={true}/>
                 <Input
                    label='Fecha Ingreso:'
                    type='text'
                    name='fechaIngreso'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0].fechaIngreso? dataInscripcion.consultarInscripcionPorId[0].fechaIngreso: "Sin fecha de ingreso registrada"}
                    required={false} 
                    isDisabled={true}/>                  
                <Input
                    label='Fecha Egreso:'
                    type='text'
                    name='fechaEgreso'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0].fechaEgreso? dataInscripcion.consultarInscripcionPorId.fechaEgreso: "Sin fecha de egreso establecida"}
                    required={false} 
                    isDisabled={true}                      
                />
                <Input
                    label='Proyecto:'
                    type='text'
                    name='proyecto'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0].proyecto.nombre}
                    required={true}
                    isDisabled={true}                      
                />
                <Input
                    label='Nombre Estudiante:'
                    type='text'
                    name='nombreEstudiante'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0].estudiante.nombre}
                    required={true}
                    isDisabled={true}                      
                />
                <Input
                    label='Apellido Estudiante:'
                    type='text'
                    name='apellidoEstudiante'
                    defaultValue={dataInscripcion.consultarInscripcionPorId[0].estudiante.apellido}
                    required={true}
                    isDisabled={true}                      
                /> 
                <div className='flex flex-row'>              
                    <ButtonLoading                        
                        disabled={Object.keys(formData).length === 0}
                        //loading={mutationLoading}
                        text='Aprobar' 
                    /> 
                    <ButtonLoading                        
                        disabled={Object.keys(formData).length === 0}
                        //loading={mutationLoading}
                        text='Rechazar' 
                    /> 
                </div> 
                </form>

            </div>
            </>
        )
    }
   

}

export default ActualizarInscripcion
