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
    
    if( formData.password !== formData.confirmPassword){
      toast.warning('Las contraseñas no coiciden')
      console.log('las contraseñas no coinciden'+ formData.password + ' -- ' + formData.confirmPassword)     
    }else{
      toast.success('las contraseñas coinciden');
      console.log('las contraseñas coinciden'+ formData.password + ' -- ' + formData.confirmPassword);
      crearUsuario({
        variables: {...formData },
      });
      document.getElementById("formularioRegistro").reset();
      
    }   
    
    
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
        id= "formularioRegistro"
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
          id='password'                        
          required={true} />
        <Input
          label='Confirmar Contraseña:'
          type='password'
          name='confirmPassword'
          id='confirmPassword'                        
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
