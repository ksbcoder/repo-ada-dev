import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { OBTENER_INSCRIPCIONES_PROYECTO } from "graphql/inscripciones/queries";
import { APROBAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import ReactLoading from "react-loading";
import { RECHAZAR_INSCRIPCION } from "graphql/inscripciones/mutations";

const ProyectoInscripciones = () => {
  const { userData } = useUser();
  const { _id } = useParams();

  console.log("el id del proyecto es:" + _id);

  const {
    data: dataInscripciones,
    error: errorInscripciones,
    loading: loadingInscripciones,
    refetch: refetchInscripciones,
  } = useQuery(OBTENER_INSCRIPCIONES_PROYECTO, {
    variables: { projectId: _id },
  });

  const [
    AprobarInscripcion,
    {
      data: dataAprobarInscripcion,
      error: errorAprobarInscripcion,
      loading: loadingAprobarInscripcion,
    },
  ] = useMutation(APROBAR_INSCRIPCION);

  const [
    RechazarInscripcion,
    {
      data: dataRechazarInscripcion,
      error: errorRechazarInscripcion,
      loading: loadingRechazarInscripcion,
    },
  ] = useMutation(RECHAZAR_INSCRIPCION);

  useEffect(() => {
    refetchInscripciones();
  }, [refetchInscripciones]);

  useEffect(() => {
    console.log("data inscripcion proyecto", dataInscripciones);
  }, [dataInscripciones]);

  useEffect(() => {
    if (errorInscripciones) {
      toast.error("Error al consultar las inscripciones del proyecto");
    }
  }, [errorInscripciones]);

  if (loadingInscripciones) {
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

  if (dataInscripciones.consultarInscripcionesPorProyecto.length == 0) {
    return (
      <>
        <nav className="navbar">
          <h1>Inscripciones por Proyecto</h1>
        </nav>
        <div className="flew flex-col w-full h-full items-center justify-center p-10">
          <Link to="../proyectos">
            <i className="fas fa-chevron-circle-left text-blue-400 cursor-pointer font-bold text-xl hover:text-green-400" />
          </Link>
          <div className=" m-8 flex items-center bg-gray-700 justify-center flex-wrap p-6 text-2xl text-white">
            El proyecto no tiene inscripciones por el momento
          </div>
        </div>
      </>
    );
  } else {
    if (userData.rol === "LIDER") {
      return (
        <>
          <nav className="navbar">
            <h1>Inscripciones por Proyecto</h1>
          </nav>

          <div className="flew flex-col w-full h-full items-center justify-center p-10">
            <Link to="../proyectos">
              <i className="fas fa-chevron-circle-left text-blue-400 cursor-pointer font-bold text-xl hover:text-green-400" />
            </Link>
            <div className="flew flex-col w-full h-full items-center justify-center p-10">
              <div className="table-container">
                <table className="table-list">
                  <thead>
                    <tr>
                      <th>Id Inscripcion</th>
                      <th>Estado</th>
                      <th>Fecha Inscripcion</th>
                      <th>Fecha Ingreso</th>
                      <th>Fecha Egreso</th>
                      <th>Proyecto</th>
                      <th>Estudiante</th>
                      {userData.rol === "LIDER" ? <th>Acciones</th> : ""}
                    </tr>
                  </thead>
                  <tbody>
                    {dataInscripciones != null &&
                      dataInscripciones.consultarInscripcionesPorProyecto.map(
                        (u) => {
                          return (
                            <tr key={u._id}>
                              <td>{u._id.slice(19)}</td>
                              <td>{u.estado}</td>
                              <td>{u.fechaInscripcion}</td>
                              <td>{u.fechaIngreso}</td>
                              <td>{u.fechaEgreso}</td>
                              <td>{u.proyecto.nombre}</td>
                              <td>{u.estudiante.nombre}</td>
                              <td>
                                {u.estado === "PENDIENTE" ? (
                                  <div className="flex justify-evenly gap-2">
                                    <button
                                      className="btn-general-aprobar"
                                      onClick={() =>
                                        AprobarInscripcion({
                                          variables: {
                                            aprobarInscripcionId: u._id,
                                          },
                                        })
                                      }
                                    >
                                      <i className="fas fa-check"></i>
                                    </button>
                                    <button
                                      className="btn-general-rechazar"
                                      onClick={() =>
                                        RechazarInscripcion({
                                          variables: {
                                            rechazarInscripcionId: u._id,
                                          },
                                        })
                                      }
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </div>
                                ) : (
                                  "--"
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
};

export default ProyectoInscripciones;
