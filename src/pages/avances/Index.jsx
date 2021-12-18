import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useUser } from "../../context/userContext";
import { OBTENER_AVANCES_POR_PROYECTO } from "graphql/avances/queries";
import { OBTENER_AVANCES } from "graphql/avances/queries";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import PrivateComponent from "components/PrivateComponent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { OBTENER_AVANCES_POR_LIDER } from "graphql/avances/queries";

const IndexAvances = () => {
  const { userData } = useUser();

  const {
    data: queryAvances,
    error: errorAvances,
    loading: loadingAvances,
    refetch: refetchAvances,
  } = useQuery(OBTENER_AVANCES);

  const {
    data: queryAvanceProyecto,
    error: errorAvanceProyecto,
    loading: loadingAvanceProyecto,
    refetch: refetchAvanceProyecto,
  } = useQuery(OBTENER_AVANCES_POR_PROYECTO, {
    variables: {
      _id: userData._id,
    },
  });

  const {
    data: queryAvancesLider,
    error: errorAvancesLider,
    loading: loadingAvancesLider,
    refetch: refetchAvancesLider,
  } = useQuery(OBTENER_AVANCES_POR_LIDER, {
    variables: {
      _id: userData._id,
    },
  });

  useEffect(() => {
    refetchAvances();
    refetchAvanceProyecto();
    refetchAvancesLider();
  }, [refetchAvanceProyecto, refetchAvancesLider, refetchAvances]);

  useEffect(() => {
    if (errorAvancesLider || errorAvanceProyecto || errorAvances) {
      toast.error("Error consultando los avances :(");
    }
  }, [errorAvancesLider, errorAvanceProyecto, errorAvances]);

  if (loadingAvancesLider || loadingAvanceProyecto || loadingAvances) {
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
      <div>
        <div className="navbar">
          <span>Avances</span>
        </div>
        <div className="flex flex-row-reverse flex-nowrap mr-8 mt-9 gap-2">
          <PrivateComponent roleList={["ADMINISTRADOR", "ESTUDIANTE"]}>
            <Link to="registrar" className="btn-general-submit text-xl">
              Registrar Avance
            </Link>
          </PrivateComponent>
        </div>
        {userData.rol === "ADMINISTRADOR" && (
          <>
            <div className="flex mx-7 p-3 bg-blue-200 text-blue-800 max-w-max rounded-lg shadow-md">
              Total de avances: {queryAvances.Avances.length}
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="table-container">
                <table id="table-list">
                  <thead>
                    <tr>
                      <th>Id Avance</th>
                      <th>Proyecto</th>
                      <th>Fecha</th>
                      <th>Descripción</th>
                      <th>Observaciones</th>
                      <th>Creado por</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryAvances &&
                      queryAvances.Avances.map((u) => {
                        return (
                          <tr key={u._id}>
                            <td>{u._id.slice(19)}</td>
                            <td>
                              <Accordion
                                TransitionProps={{ unmountOnExit: true }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <i className="fas fa-chevron-down"></i>
                                  }
                                  aria-controls="accordion"
                                  id="accordion"
                                >
                                  <Typography className="pr-2">
                                    {u.proyecto.nombre}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    <div>
                                      Fase: {u.proyecto.fase} <br />
                                      Estado: {u.proyecto.estado}
                                    </div>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </td>
                            <td>{u.fechaAvance.slice(0, 10)}</td>
                            <td>{u.descripcion}</td>
                            <td>
                              <Accordion
                                TransitionProps={{ unmountOnExit: true }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <i className="fas fa-chevron-down"></i>
                                  }
                                  aria-controls="accordion"
                                  id="accordion"
                                >
                                  <Typography className="pr-2">Ver</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                  <Typography>{u.observaciones}</Typography>
                                </AccordionDetails>
                              </Accordion>
                            </td>
                            <td>
                              {u.creadoPor.nombre + " " + u.creadoPor.apellido}
                            </td>
                            <td>
                              <Link
                                to={`actualizar/${u._id}`}
                                className="btn-general-editar"
                              >
                                Actualizar
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {userData.rol === "LIDER" && (
          <>
            <div className="flex mx-7 p-3 bg-blue-200 text-blue-800 max-w-max rounded-lg shadow-md">
              Avances de proyectos que lideras:{" "}
              {queryAvancesLider.AvancesPorLider.length}
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="table-container">
                <table id="table-list">
                  <thead>
                    <tr>
                      <th>Id Avance</th>
                      <th>Proyecto</th>
                      <th>Fecha</th>
                      <th>Descripción</th>
                      <th>Observaciones</th>
                      <th>Creado por</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryAvancesLider &&
                      queryAvancesLider.AvancesPorLider.map((u) => {
                        return (
                          <tr key={u._id}>
                            <td>{u._id.slice(19)}</td>
                            <td>
                              <Accordion
                                TransitionProps={{ unmountOnExit: true }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <i className="fas fa-chevron-down"></i>
                                  }
                                  aria-controls="accordion"
                                  id="accordion"
                                >
                                  <Typography className="pr-2">
                                    {u.proyecto.nombre}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    <div>
                                      Fase: {u.proyecto.fase} <br />
                                      Estado: {u.proyecto.estado}
                                    </div>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </td>
                            <td>{u.fechaAvance.slice(0, 10)}</td>
                            <td>{u.descripcion}</td>
                            <td>
                              <Accordion
                                TransitionProps={{ unmountOnExit: true }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <i className="fas fa-chevron-down"></i>
                                  }
                                  aria-controls="accordion"
                                  id="accordion"
                                >
                                  <Typography className="pr-2">Ver</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>{u.observaciones}</Typography>
                                </AccordionDetails>
                              </Accordion>
                            </td>
                            <td>
                              {u.creadoPor.nombre + " " + u.creadoPor.apellido}
                            </td>
                            <td>
                              <Link
                                to={`actualizar/${u._id}`}
                                className="btn-general-editar"
                              >
                                Modificar
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else if (userData.rol === "ESTUDIANTE") {
    return (
      <div>
        <div className="navbar">
          <span>Avances</span>
        </div>
        <div className="flex flex-row-reverse flex-nowrap mr-8 mt-9 gap-2">
          <PrivateComponent roleList={["ADMINISTRADOR", "ESTUDIANTE"]}>
            <Link
              to="registrar"
              className="btn-general-submit text-xl shadow-xl"
            >
              Registrar Avance
            </Link>
          </PrivateComponent>
        </div>
        <div className="flex mx-7 p-3 bg-blue-200 text-blue-800 max-w-max rounded-lg shadow-md">
          Avances de proyectos inscritos:{" "}
          {queryAvanceProyecto.AvancesPorProyecto.length}
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="table-container">
            <table id="table-list">
              <thead>
                <tr>
                  <th>Id Avance</th>
                  <th>Proyecto</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Observaciones</th>
                  <th>Creado por</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {queryAvanceProyecto &&
                  queryAvanceProyecto.AvancesPorProyecto.map((i) => {
                    return (
                      <tr key={i._id}>
                        <td>{i._id.slice(19)}</td>
                        <td>
                          <Accordion
                            TransitionProps={{
                              unmountOnExit: true,
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <i className="fas fa-chevron-down"></i>
                              }
                              aria-controls="accordion"
                              id="accordion"
                            >
                              <Typography className="pr-2">
                                {i.proyecto.nombre}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                <div>
                                  Fase: {i.proyecto.fase} <br />
                                  Estado: {i.proyecto.estado}
                                </div>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </td>
                        <td>{i.fechaAvance.slice(0, 10)}</td>
                        <td>{i.descripcion}</td>
                        <td>
                          <Accordion
                            TransitionProps={{
                              unmountOnExit: true,
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <i className="fas fa-chevron-down"></i>
                              }
                              aria-controls="accordion"
                              id="accordion"
                            >
                              <Typography className="pr-2">Ver</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>{i.observaciones}</Typography>
                            </AccordionDetails>
                          </Accordion>
                        </td>
                        <td>
                          {i.creadoPor.nombre + " " + i.creadoPor.apellido}
                        </td>
                        <td>
                          {userData._id !== i.creadoPor._id ? (
                            <div className="flex justify-center">--</div>
                          ) : (
                            <Link
                              to={`actualizar/${i._id}`}
                              className="btn-general-editar"
                            >
                              Actualizar
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default IndexAvances;
