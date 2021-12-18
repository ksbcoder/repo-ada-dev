import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import ReactLoading from "react-loading";
import { APROBAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { RECHAZAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { OBTENER_INSCRIPCIONES_LIDER } from "graphql/inscripciones/queries";
import { OBTENER_INSCRIPCIONES } from "graphql/inscripciones/queries";
import { OBTENER_INSCRIPCIONES_ESTUDIANTE } from "graphql/inscripciones/queries";

const IndexInscripciones = () => {
  const { userData } = useUser();

  const {
    data: data,
    error: error,
    loading: loading,
    refetch: refetch,
  } = useQuery(OBTENER_INSCRIPCIONES);

  const {
    data: dataInscripciones,
    error: errorInscripciones,
    loading: loadingInscripciones,
    refetch: refetchInscripciones,
  } = useQuery(OBTENER_INSCRIPCIONES_LIDER);

  const {
    data: dataInscripcionesEstudiante,
    error: errorInscripcionesEstudiante,
    loading: loadingInscripcionesEstudiante,
    refetch: refetchInscripcionesEstudiante,
  } = useQuery(OBTENER_INSCRIPCIONES_ESTUDIANTE, {
    variables: {
      estudianteId: userData._id,
    },
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
    refetch();
    refetchInscripciones();
    refetchInscripcionesEstudiante();
  }, [refetchInscripciones, refetch, refetchInscripcionesEstudiante]);

  useEffect(() => {
    if (dataAprobarInscripcion) {
      toast.success("¡Inscripción Aprobada!");
    }
    if (dataRechazarInscripcion) {
      toast.warning("¡Inscripción Rechazada!");
    }
  }, [dataAprobarInscripcion, dataRechazarInscripcion]);

  useEffect(() => {
    if (errorInscripciones) {
      toast.error("Error al consultar las inscripciones");
    }
    if (errorInscripcionesEstudiante) {
      toast.error("Error al consultar las inscripciones");
    }
    if (errorAprobarInscripcion) {
      toast.error("Error al aprobar la inscripción");
    }
    if (errorRechazarInscripcion) {
      toast.error("Error al rechazar la inscripción");
    }
  }, [
    errorInscripciones,
    errorAprobarInscripcion,
    errorRechazarInscripcion,
    errorInscripcionesEstudiante,
  ]);

  if (
    loadingInscripciones ||
    loadingAprobarInscripcion ||
    loadingRechazarInscripcion ||
    loadingInscripcionesEstudiante
  ) {
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

  if (userData.rol === "ESTUDIANTE") {
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
                  <th>Proyecto</th>
                  <th>Estudiante</th>
                </tr>
              </thead>
              <tbody>
                {dataInscripcionesEstudiante &&
                  dataInscripcionesEstudiante.consultarInscripcionesPorEstudiante.map(
                    (u) => {
                      return (
                        <tr key={u._id}>
                          <td>{u._id.slice(19)}</td>
                          <td>{u.estado}</td>
                          <td>{u.fechaInscripcion.slice(0, 10)}</td>
                          <td>{u.proyecto.nombre}</td>
                          <td>{userData.nombre + " " + userData.apellido}</td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  if (userData.rol === "LIDER") {
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
                  dataInscripciones.consultarInscripcionesPorLider.map((u) => {
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
  if (userData.rol === "ADMINISTRADOR") {
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
                {data &&
                  data.consultarInscripciones.map((u) => {
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
