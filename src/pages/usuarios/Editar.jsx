import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { Link } from 'react-router-dom';
import Input from 'components/Input';

const EditarUsuario = () => {
    
    const {_id} = useParams();
    const{data,error,loading} = useQuery(GET_USUARIO, {
        variables:{_id}
    })
    console.log(data);
    
    return (
        <div className='flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-500 cursor-pointer font-bold text-xl hover:text-gray-900'/>
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1> 
            <Input label='Nombre' required={true} type='text' defaultValue={'Juan'} className='input-usuario'></Input>
            <Input label='Apellido' required={true} type='text' defaultValue='Heldson' className='input-usuario'></Input>

            {/* <form
                //onSubmit={submitForm}
                //onChange={updateFormData}
                //ref={form}
                className='flex flex-col items-center justify-center'                
            >
             <input
                label='Nombre'
                required={true}
                type='text'
                name='nombre'                
                defaultValue={data.Usuario.nombre}
            />
            <Input
                label='Apellido'
                required={true}
                type='text'
                name='apellido'                
                defaultValue={data.Usuario.apellido}
            />
            <Input
                label='correo'
                required={true}
                type='email'
                name='correo'                
                defaultValue={data.Usuario.correo}
            /> 
            <Input
                label='estado'
                required={true}
                type='text'
                name='estado'                
                defaultValue={data.Usuario.estado}
            /> 
            </form> */}

        </div>    )
}

export default EditarUsuario
