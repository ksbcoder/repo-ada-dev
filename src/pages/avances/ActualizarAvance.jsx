import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useUser } from "../../context/userContext";
import useFormData from "hooks/useFormData";
import { useQuery, useMutation } from "@apollo/client";
import { OBTENER_AVANCE } from "graphql/avances/queries";
import { EDITAR_AVANCE } from "graphql/avances/mutations";
import PrivateComponent from "components/PrivateComponent";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const ActualizarAvance = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { userData } = useUser();
  const { _id } = useParams();
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(OBTENER_AVANCE, {
    variables: {
      _id,
    },
  });

  useEffect(() => {
    if (queryError) {
      toast.error("Error obteniendo el avance");
    }
  }, [queryError]);

  const [
    editarAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.fechaAvance;
    delete formData.creadoPor;
    console.log("fd", formData);
    editarAvance({
      variables: {
        _id,
        ...formData,
      },
    });
  };

  useEffect(() => {
    if (mutationData && mutationData.editarAvance === null) {
      // console.log("md terminado", mutationData.editarAvance);
      toast.warning("No se editó el avance :(");
    } else if (mutationData && mutationData.editarAvance !== null) {
      // console.log("md desarrollo", mutationData.editarAvance);
      toast.success(" Avance Actualizado ;)");
    }
    if (mutationError) {
      toast.error("Error actualizando el avance :(");
    }
  }, [mutationData, mutationError]);

  if (queryLoading || mutationLoading) {
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
        <span className="titulo-general">Actualización de Avances</span>
      </div>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center mt-5"
      >
        {userData.rol === "ESTUDIANTE" && (
          <>
            <div className="grid grid-cols-3 gap-1 w-auto">
              <div className="form-general">
                <span className="pr-2">Proyecto</span>
                <input
                  type="text"
                  name="proyecto"
                  className="input-general"
                  defaultValue={queryData.Avance.proyecto.nombre}
                  readOnly
                  required
                />
              </div>
              <div className="form-general">
                <span className="pr-2">Fecha</span>
                <input
                  type="text"
                  name="fechaAvance"
                  className="input-general"
                  defaultValue={queryData.Avance.fechaAvance.slice(0, 10)}
                  readOnly
                  required
                />
              </div>
              <div className="form-general">
                <span className="pr-2">Creado por</span>
                <input
                  type="text"
                  name="creadoPor"
                  className="input-general"
                  defaultValue={
                    queryData.Avance.creadoPor.nombre +
                    " " +
                    queryData.Avance.creadoPor.apellido
                  }
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="mt-7 flex flex-col items-center">
              <span className="pb-2">Descripción</span>
              <textarea
                name="descripcion"
                cols="40"
                rows="5"
                placeholder="Escribe aquí tu descripción"
                className="input-general"
                defaultValue={queryData.Avance.descripcion}
                required
              ></textarea>
            </div>
          </>
        )}
        {userData.rol === "LIDER" && (
          <>
            <div className="grid grid-cols-3 gap-1 w-auto">
              <div className="form-general">
                <span className="pr-2">Proyecto</span>
                <input
                  type="text"
                  name="proyecto"
                  className="input-general"
                  defaultValue={queryData.Avance.proyecto.nombre}
                  readOnly
                  required
                />
              </div>
              <div className="form-general">
                <span className="pr-2">Fecha</span>
                <input
                  type="text"
                  name="fechaAvance"
                  className="input-general"
                  defaultValue={queryData.Avance.fechaAvance.slice(0, 10)}
                  disabled
                  required
                />
              </div>
              <div className="form-general">
                <span className="pr-2">Creado por</span>
                <input
                  type="text"
                  name="creadoPor"
                  className="input-general"
                  defaultValue={
                    queryData.Avance.creadoPor.nombre +
                    " " +
                    queryData.Avance.creadoPor.apellido
                  }
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-7 flex flex-col items-center">
              <span className="pb-2">Descripción</span>
              <textarea
                name="descripcion"
                cols="40"
                rows="5"
                placeholder="Escribe aquí tu descripción"
                className="input-general"
                defaultValue={queryData.Avance.descripcion}
                readOnly
              ></textarea>
            </div>
          </>
        )}
        {userData.rol === "ADMINISTRADOR" && (
          <>
            <div className="grid grid-cols-3 gap-1 w-auto">
              <div className="form-general">
                <span className="pr-2">Proyecto</span>
                <input
                  type="text"
                  name="proyecto"
                  className="input-general"
                  defaultValue={queryData.Avance.proyecto.nombre}
                  required
                />
              </div>
              <div className="form-general">
                <span className="pr-2">Fecha</span>
                <input
                  type="text"
                  name="fechaAvance"
                  className="input-general"
                  defaultValue={queryData.Avance.fechaAvance.slice(0, 10)}
                  required
                />
              </div>
              <div className="form-general">
                <span className="pr-2">Creado por</span>
                <input
                  type="text"
                  name="creadoPor"
                  className="input-general"
                  defaultValue={
                    queryData.Avance.creadoPor.nombre +
                    " " +
                    queryData.Avance.creadoPor.apellido
                  }
                  required
                />
              </div>
            </div>
            <div className="mt-7 flex flex-col items-center">
              <span className="pb-2">Descripción</span>
              <textarea
                name="descripcion"
                cols="40"
                rows="5"
                placeholder="Escribe aquí tu descripción"
                className="input-general"
                defaultValue={queryData.Avance.descripcion}
              ></textarea>
            </div>
          </>
        )}
        <PrivateComponent roleList={["LIDER", "ADMINISTRADOR"]}>
          <div className="mt-7 flex flex-col items-center">
            <span className="pb-2">Observaciones</span>
            <textarea
              name="observaciones"
              cols="40"
              rows="5"
              placeholder="Escribe aquí tus observaciones"
              className="input-general"
              defaultValue={queryData.Avance.observaciones}
              required
            ></textarea>
          </div>
        </PrivateComponent>

        <div className="form-general">
          <button className="btn-general mt-4 text-xl" type="submit">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarAvance;
