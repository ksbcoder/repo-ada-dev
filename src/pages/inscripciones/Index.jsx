import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { OBTENER_INSCRIPCIONES } from "graphql/inscripciones/queries";
import { APROBAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import ReactLoading from "react-loading";

const IndexInscripciones = () => {
  const { userData } = useUser();

  const {
    data: dataInscripciones,
    error: errorInscripciones,
    loading: loadingInscripciones,
    refetch: refetchInscripciones,
  } = useQuery(OBTENER_INSCRIPCIONES);

  const [
    AprobarInscripcion,
    {
      data: dataAprobarInscripcion,
      error: errorAprobarInscripcion,
      loading: loadingAprobarInscripcion,
      refetch: refetchAprobarInscripcion,
    },
  ] = useMutation(APROBAR_INSCRIPCION);

  useEffect(() => {
    refetchInscripciones();
  }, [refetchInscripciones]);

  useEffect(() => {
    if (dataAprobarInscripcion) {
      toast.success("¡Inscripción Aprobada!");
    }
  }, [dataAprobarInscripcion]);

  useEffect(() => {
    if (errorInscripciones) {
      toast.error("Error al consultar las inscripciones");
    }
    if (errorAprobarInscripcion) {
      toast.error("Error al aprobar la inscripción");
    }
  }, [errorInscripciones, errorAprobarInscripcion]);

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

  if (userData.rol === "LIDER" || userData.rol === "ADMINISTRADOR") {
    return (
      <>
        <nav className="navbar">
          <h1>Inscripciones</h1>
        </nav>
        <div className="flew flex-col w-full h-full items-center justify-center p-10">
          <div className="table-container">
            <table className="table-list">
              <thead>
                <tr>
                  <th>Id</th>
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
                {dataInscripciones &&
                  dataInscripciones.consultarInscripciones.map((u) => {
                    return (
                      <tr key={u._id}>
                        <td>{u._id.slice(19)}</td>
                        <td>{u.estado}</td>
                        <td>{u.fechaInscripcion.slice(0, 10)}</td>
                        <td>
                          {u.fechaIngreso
                            ? u.fechaIngreso.slice(0, 10)
                            : "Sin fecha de ingreso registrada"}
                        </td>
                        <td>
                          {u.fechaEgreso
                            ? u.fechaEgreso.slice(0, 10)
                            : "Sin fecha de egreso establecida"}
                        </td>
                        <td>{u.proyecto.nombre}</td>
                        <td>
                          {u.estudiante.nombre + " " + u.estudiante.apellido}
                        </td>
                        {userData.rol === "LIDER" ? (
                          <td>
                            {/* <Link className="btn-editar" to={`/inscripciones/ActualizarInscripcion/${u._id}`} ><i className="fas fa-edit"></i></Link>*/}
                            <div className="flex justify-evenly gap-2">
                              <button
                                className="btn-general-aprobar"
                                onClick={() =>
                                  AprobarInscripcion({
                                    variables: { aprobarInscripcionId: u._id },
                                  })
                                }
                              >
                                Aprobar
                              </button>
                              <button className="btn-general-submit">
                                Rechazar
                              </button>
                            </div>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};

export default IndexInscripciones;
