import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTOS_LIDERADOS } from "graphql/proyectos/queries";
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';

const EditarProyecto = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { userData } = useUser();
    const { _id } = useParams();
    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_PROYECTOS_LIDERADOS, {
        variables: { _id },
    });


    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_PROYECTO);

    const submitForm = (e) => {
        e.preventDefault();
        editarProyecto({
            variables: {
                _id,
                campos: formData,
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

        if (queryError) {
        toast.error('Error consultando el proyecto');
        }
    }, [queryError, mutationError]);

    if (queryLoading) return <div>Cargando....</div>;

    return (    
        <><nav className="navbar">
            <h1>Editar Proyecto</h1>
        </nav>
                <div className='flew flex-col w-full h-full items-center justify-center p-10'>
                <Link to='../proyectos/Index'>
                    <i className='fas fa-chevron-circle-left text-blue-400 cursor-pointer font-bold text-xl hover:text-green-400' />
                </Link>               
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className='flex flex-col items-center justify-center'
                >
                    <div className="form-general">
                    <span className="pr-2 text-lg">Nombre</span>
                    <input
                        type="text"
                        name="nombre"
                        className="input-general "
                        defaultValue={queryData.ProyectosLiderados.nombre}
                        readOnly
                        required
                    />
                    </div>
                    <div className="form-general">
                    <span className="pr-2 text-lg">Presupuesto</span>
                    <input
                        type="number"
                        name="presupuesto"
                        className="input-general "
                        defaultValue={data.ProyectosLiderados.nombre}
                        readOnly
                        required
                    />
                    </div>
                    <div className="form-general">
                    <span className="pr-2 text-lg">Fecha de Inicio</span>
                    <input
                        type="date"
                        name="fechaInicio"
                        className="input-general "
                        defaultValue={data.ProyectosLiderados.fechaInicio}
                        readOnly
                        required
                    />
                    </div>
                    
                    <DropDown
                        label='Estado del proyecto'
                        name='estado'
                        defaultValue={data.ProyectosLiderados.estado}
                        required={true}
                        options={Enum_EstadoProyecto} />

                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={mutationLoading}
                        text='Confirmar' />
                </form>
            </div></>
    );
};

export default EditarProyecto;