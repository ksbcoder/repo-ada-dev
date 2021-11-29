import { OBTENER_PROYECTOS } from "graphql/avances/queries";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import useFormData from "hooks/useFormData";
import { useUser } from "../../context/userContext";

const RegistrarAvance = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { userData } = useUser();

  useEffect(() => {
    // console.log("userdata", userData);
  }, [userData]);

  const {
    data: queryProyectosData,
    error: queryProyectosError,
    loading: queryProyectosLoading,
    refetch,
  } = useQuery(OBTENER_PROYECTOS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  /* let proyectoEliminar = [];

  if (queryProyectosData) {
    console.log("querydata", queryProyectosData);
    queryProyectosData.Proyectos.forEach((proyecto) => {
      proyecto.inscripciones.forEach((i) => {
        console.log("i.estudiante._id", i.estudiante._id);
        if (i.estudiante._id !== userData._id) {
          proyectoEliminar = proyecto._id;
          console.log("proyectoEliminar", proyectoEliminar);
          delete queryProyectosData.Proyectos.proyecto;
        }
      });
      console.log("quetysinp", queryProyectosData);
    });
  } */

  useEffect(() => {
    if (queryProyectosError) {
      toast.error("Error consultando los proyectos");
    }
  }, [queryProyectosError]);

  const [
    crearAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    crearAvance({
      variables: {
        ...formData,
      },
    });
  };

  useEffect(() => {
    if (mutationData && mutationData.crearAvance === null) {
      // console.log("md terminado", mutationData.crearAvance);
      toast.warning("No se creó el avance :(");
    } else if (mutationData && mutationData.crearAvance !== null) {
      // console.log("md desarrollo", mutationData.crearAvance);
      toast.success("Avance creado :)");
    }
    if (mutationError) {
      toast.error("Error creando el avance :(");
    }
  }, [mutationData, mutationError]);

  if (queryProyectosLoading || mutationLoading) {
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

  return (
    <div>
      <div className="text-center mt-20">
        <div className="flex justify-start ml-10">
          <Link to="/avances" className="btn-general">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <span className="titulo-general">Registro de Avances</span>
      </div>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center mt-5"
      >
        <div className="grid grid-cols-1 w-auto">
          <div className="form-general">
            <span className="pr-2">Proyecto</span>
            <select
              name="proyecto"
              type="text"
              defaultValue=""
              className="input-general"
              required
            >
              <option value="" disabled>
                Seleccione una opción...
              </option>
              {queryProyectosData &&
                queryProyectosData.Proyectos.map((el) => {
                  return (
                    <option key={el._id} value={el._id}>
                      {el.nombre}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* <div className="form-general">
            <span className="pr-2">Fecha</span>
            <input
              type="datetime-local"
              name="fechaAvance"
              className="input-general"
              required
            />
          </div> */}
          <div className="grid grid-cols-2 gap-2 w-auto">
            <div className="mt-9 flex flex-col items-center">
              <span className="pb-2">Descripción</span>
              <textarea
                name="descripcion"
                cols="40"
                rows="5"
                placeholder="Escribe aquí tu descripción"
                className="input-general"
                required
              ></textarea>
            </div>
            <div className="mt-9 flex flex-col items-center">
              <span className="pb-2">Observaciones</span>
              <textarea
                name="observaciones"
                cols="40"
                rows="5"
                placeholder="Escribe aquí tus observaciones"
                className="input-general"
                /* required */
              ></textarea>
            </div>
          </div>
        </div>
        {/* <div className="form-general">
          <span className="pr-2">Creado por</span>
          <select
            name="creadoPor"
            type="text"
            defaultValue=""
            className="input-general"
            required
          >
            <option value="" disabled>
              Seleccione un usuario...
            </option>
            {queryUsuariosData &&
              queryUsuariosData.Usuarios.map((el) => {
                return (
                  <option key={el._id} value={el._id}>
                    {el.nombre + " " + el.apellido}
                  </option>
                );
              })}
          </select>
        </div> */}
        <div className="form-general">
          <button className="btn-general mt-4 text-xl" type="submit">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarAvance;
