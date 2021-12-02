import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import useFormData from "hooks/useFormData";
import PrivateComponent from "components/PrivateComponent";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import { OBTENER_PROYECTOS_LITE } from "graphql/avances/queries";

const RegistrarAvance = () => {
  const { form, formData, updateFormData } = useFormData(null);

  const {
    data: queryProyectosData,
    error: queryProyectosError,
    loading: queryProyectosLoading,
    refetch,
  } = useQuery(OBTENER_PROYECTOS_LITE);
  const [aviso, setAviso] = useState(true);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    console.log("queryProyectosData", queryProyectosData);
  }, [queryProyectosData]);

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
      toast.warning("No se creó el avance 🙁");
    } else if (mutationData && mutationData.crearAvance !== null) {
      // console.log("md desarrollo", mutationData.crearAvance);
      toast.success("Avance creado 😊");
    }
    if (mutationError) {
      toast.error("Error creando el avance 😔");
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

  if (!queryProyectosLoading) {
    return (
      <div>
        <div className="text-center">
          <div className="navbar">
            <span>Registro de Avances</span>
          </div>
          <div className="flex justify-start ml-10 mt-10">
            <Link to="/avances" className="btn-general">
              <i className="fas fa-arrow-left"></i>
            </Link>
            {aviso === true && (
              <span className="ml-8 bg-yellow-300 bg-opacity-60 p-2 rounded-md text-yellow-700 animate-bounce">
                ¡Recuerda que solo puedes agregar avances en los proyectos que
                estés inscrito!
              </span>
            )}
          </div>
        </div>
        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className="flex flex-col items-center mt-14"
        >
          <div className="grid grid-cols-1 w-auto">
            <div className="form-general">
              <span className="pr-2 text-lg">Proyecto</span>
              <select
                name="proyecto"
                type="text"
                defaultValue=""
                className="input-general text-lg"
                required
              >
                <option value="" disabled>
                  Seleccione una opción...
                </option>
                {queryProyectosData &&
                  queryProyectosData.ProyectosRegistrar.map((el) => {
                    return (
                      <option key={el._id} value={el._id}>
                        {el.nombre}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="grid grid-cols-1 w-auto mt-4">
              <div className="mt-9 flex flex-col items-center">
                <span className="pb-2 text-lg">Descripción</span>
                <textarea
                  name="descripcion"
                  cols="40"
                  rows="5"
                  placeholder="Escribe aquí tu descripción"
                  className="input-general text-lg"
                  onClick={() => setAviso(false)}
                  required
                ></textarea>
              </div>
              <PrivateComponent roleList={["LIDER"]}>
                <div className="mt-9 flex flex-col items-center">
                  <span className="pb-2">Observaciones</span>
                  <textarea
                    name="observaciones"
                    cols="40"
                    rows="5"
                    placeholder="Escribe aquí tus observaciones"
                    className="input-general"
                    onClick={() => setAviso(false)}
                  ></textarea>
                </div>
              </PrivateComponent>
            </div>
          </div>
          <div className="form-general">
            <div className="grid grid-cols-2 gap-6 mt-5 text-center">
              <Link
                to="/avances"
                className="btn-general-cancelar mt-6 text-2xl"
              >
                Cancelar
              </Link>
              <button
                className="btn-general-submit mt-6 text-2xl"
                type="submit"
              >
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default RegistrarAvance;
