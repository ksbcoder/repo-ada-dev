import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Dialog } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTO } from "graphql/proyectos/queries";
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_PROYECTO_ADMIN, EDITAR_PROYECTO_LIDER, EDITAR_OBJETIVO } from 'graphql/proyectos/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo } from 'utils/enums';
import { useUser } from "context/userContext";

const EditarProyecto = () => {
  const {_id}= useParams();
  const { userData } = useUser();
  const{data: queryData, error: queryError, loading: queryLoading, refetch: refetchProyecto,} =
  useQuery(GET_PROYECTO, {
    variables: {
      _id,
    },
  });

  useEffect(() => {
    refetchProyecto();
  }, [refetchProyecto]);

  useEffect(() => {
    if (queryError) {
      toast.error('Error consultando el proyecto');
    }
  }, [queryError]);

  if (queryLoading) return <div>Cargando....</div>;

  if (queryData.LeerProyecto){
    return (    
      <>
      <nav className="navbar">
        <h1>Editar Proyecto</h1>
      </nav>
      <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link to='../proyectos'>
          <i className='fas fa-chevron-circle-left text-blue-400 cursor-pointer font-bold text-xl hover:text-green-400' />
        </Link>               
      {userData.rol==='ADMINISTRADOR'?
      <div>
        <FormEditProyectoAdmin proyecto={queryData.LeerProyecto}/>
      </div>: ""
      }
  
      {userData.rol==='LIDER' ?
      <div>
        <FormEditProyecto proyecto={queryData.LeerProyecto} />
      </div>: ""
      }
      </div>
      </>
    );
  }
  return <></>;
};

const FormEditProyectoAdmin = ({ proyecto }) =>{
  const { form, formData, updateFormData } = useFormData();
  const [editarProyectoAdmin, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_PROYECTO_ADMIN, {
      refetchQueries: [{ query: GET_PROYECTO }],
    });

  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto=parseFloat(formData.presupuesto);
    editarProyectoAdmin({
      variables: {
        _id: proyecto._id,
        ...formData,
      },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
    toast.error('Error modificando el proyecto');
    }
  }, [mutationError]);

  return(
    <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      className='flex flex-col items-center justify-center'
    >
                    
    <span>Nombre: {proyecto.nombre}</span> 
    <span>Presupuesto: {proyecto.presupuesto}</span> 
    <span>Fecha de inicio: {proyecto.fechaInicio}</span>
    <span>Fecha de fin: {proyecto.fechaFin}</span>
    <DropDown
      label='Estado del proyecto'
      name='estado'
      defaultValue={proyecto.estado}
      required={true}
      options={Enum_EstadoProyecto} />
    <DropDown
      label='Fase del proyecto'
      name='fase'
      defaultValue={proyecto.fase}
      required={true}
      options={Enum_FaseProyecto} />

    <ButtonLoading
      disabled={Object.keys(formData).length === 0}
      loading={mutationLoading}
      text='Confirmar' />
    </form>
  );
};

const FormEditProyecto = ({ proyecto, estado }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  return (
    <div className='p-4'>
      <table id='table-list'>
      <thead>
          <tr>
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
        <td>{proyecto.nombre}</td>
        <td>{proyecto.presupuesto}</td>
        <td>
        <i className='fas fa-pen mx-2 text-yellow-600 hover:text-yellow-400 cursor-pointer'
        onClick={() => setShowEditDialog(true)}
        />
        </td>
        </tbody>
      </table>        
    <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
      <Edit 
      nombre={proyecto.nombre}
      presupuesto={proyecto.presupuesto}
      _id={proyecto._id}
      estado = {estado}
      setShowEditDialog={setShowEditDialog}
      />
    </Dialog>
    <div className='mt-1'>
    <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={
              <i className="fas fa-chevron-down"></i>
            }
            aria-controls="accordion"
            id="accordion2"
          >
            Objetivos del proyecto
          </AccordionSummary>
          <AccordionDetails>
            <div className='flex'>
              {proyecto.objetivos.map((objetivo, index) => {
                return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} _id={objetivo._id} idProyecto = {proyecto._id} index={index} />;
              })}
            </div>
          </AccordionDetails>
        </Accordion>
    </div>      
    </div>
  );
  };

const Edit = ({nombre, presupuesto, _id, setShowEditDialog, estado}) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyectoLider, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO_LIDER, {
    refetchQueries: [{ query: GET_PROYECTO }],
  });
  
  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto=parseFloat(formData.presupuesto);
    editarProyectoLider({
      variables: {
        _id: _id,
        ...formData,
      },
    }).catch((e) => {
      console.log(e);
      toast.error('Error editando los campos');
    });
  };
  
  useEffect(() => {
    if (dataMutation) {
      toast.success('Campos modificados correctamente');
      setShowEditDialog(false);
    }
  }, [dataMutation, setShowEditDialog]);

  useEffect(() => {
    if (error) {
    toast.error('Error modificando el proyecto');
    }
  }, [error]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Modificar campos:</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
<Input
            label='Nombre:'
            type='text'
            name='nombre'
            defaultValue={nombre}
            required={true} />
        <Input
            label='Presupuesto:'
            type='number'
            name='presupuesto'
            defaultValue={presupuesto}
            required={true} />
<ButtonLoading
            disabled={estado=== 'INACTIVO'}
            loading={loading}
            text='Confirmar' />
</form>
</div>
  );
};

const Objetivo = ({ tipo, descripcion,_id, idProyecto, index }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  return (
    <div className='mx-2 my-2 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
    <div className='text-lg font-bold'>{tipo}</div>
    <div>{descripcion}</div>
      <i className='fas fa-pen mx-2 text-yellow-600 hover:text-yellow-400 cursor-pointer'
        onClick={() => setShowEditDialog(true)}
      />
    <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
      <FormEditObjetivo 
      descripcion={descripcion}
      tipo={tipo}
      index={index}
      idProyecto={idProyecto}
      setShowEditDialog={setShowEditDialog}
      />
    </Dialog>
    </div>
  );
};

const FormEditObjetivo = ({ descripcion, tipo, index, idProyecto, setShowEditDialog }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarObjetivo, { data: dataMutation, loading, error }] = useMutation(EDITAR_OBJETIVO, {
      refetchQueries: [{ query: GET_PROYECTO }],
  });

  useEffect(() => {
    if (dataMutation) {
      toast.success('Objetivo editado con exito');
      setShowEditDialog(false);
    }
  }, [dataMutation, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
          idProyecto,
          indexObjetivo: index,
          campos: formData,
      },
    }).catch((e) => {
      console.log(e);
      toast.error('Error editando el objetivo');
    });
  };
    
  return (
    <div className='p-4'>
      <h1 className='font-bold'>Modificar Objetivo</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <DropDown
          label='Tipo de objetivo'
          name='tipo'
          defaultValue={tipo}
          required={true}
          options={Enum_TipoObjetivo} />
          
          <Input
            label='Descripción del objetivo'
            type='text'
            name='descripcion'
            defaultValue={descripcion}
            required={true} />
        <ButtonLoading disabled={Object.keys(formData).length === 0} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};



export default EditarProyecto;