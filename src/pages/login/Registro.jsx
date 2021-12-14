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
import { useNavigate } from 'react-router-dom';




const RegistroUsuarios = () => {
    const { form, formData, updateFormData } = useFormData(null); 

    const [crearUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_USUARIO); 
    const navigate = useNavigate();

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
        navigate('/');         
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

    
  }, [mutationData, mutationError]); 
  
//   useEffect(() => {
//     if (mutationLoading){
//       toast.loading('...cargando')
//     }
   
//   }, [mutationLoading])

  return(
    
        <div
            className="absolute top-0 w-full h-full z-0 bg-blue-200"
            style={{
                backgroundImage:
                    "url(" + require("./img/Fondo.png").default + ")",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat"
            }}>
        
        <><nav className="navbar">
            <h1>Registro de Usuario</h1>
        </nav>
        
        <Link to='../login'>
            <i className='fas fa-chevron-circle-left mx-40 mt-2 text-blue-600 cursor-pointer font-bold text-xl hover:text-green-400' />
        </Link>     
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        id= "formularioRegistro"
        className='flex flex-col items-center justify-center z-20'>
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
      </></div>        
  );
};

export default RegistroUsuarios;
