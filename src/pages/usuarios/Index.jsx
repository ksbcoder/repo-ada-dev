import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import { Enum_Rol } from 'utils/enums';
import ButtonLoading from 'components/ButtonLoading';
import { CREAR_USUARIO } from 'graphql/usuarios/mutations';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';



const IndexUsuarios = () => {

  const { form, formData, updateFormData } = useFormData(null); 

  const [crearUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_USUARIO);  

  const submitForm = (e) => {
    e.preventDefault(); 
    
    delete formData.confirmPassword;     
    console.log(formData);
    crearUsuario({
     variables: {...formData },
    });
  };

  useEffect(() => {
    if (mutationData && mutationData.crearUsuario === null){
      toast.warning("No se ha creado el usuario")
    }else if (mutationData && mutationData.crearUsuario !== null) {
    toast.success('Usuario creado correctamente');
    }

    if (mutationError) {
      toast.error('Error creando el usuario');      
      }  

    // if (mutationLoading){
    //   toast.loading('...cargando')
    // }
  }, [mutationData, mutationError, mutationLoading]); 
  

  return(
    <><nav className="navbar">
      <h1>Registro de Usuario</h1>
    </nav>
      <div className="flex flex-row-reverse flex-nowrap mr-8 mt-5 gap-2">
        <Link to="GestionUsuarios" className="btn-general">
          Gestionar Usuarios
        </Link>
      </div>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'>
        <Input
          label='Nombre:'
          type='text'
          name='nombre'                        
          required={true} />
        <Input
          label='Apellido:'
          type='text'
          name='apellido'                        
          required={true} />                    
        <Input
          label='Identificación:'
          type='text'
          name='identificacion'                        
          required={true} />                  
        <DropDown
          label='Rol:'
          name='rol'                        
          required={true}
          options={Enum_Rol} />
        <Input
          label='Correo:'
          type='email'
          name='correo'                        
          required={true} />
        <Input
          label='Contraseña:'
          type='password'
          name='password'                        
          required={true} />
        <Input
          label='Confirmar Contraseña:'
          type='password'
          name='confirmPassword'                        
          required={true} />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Registrar' />
      </form>

        </>
  );
};

export default IndexUsuarios;
