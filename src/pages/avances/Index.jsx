import React, { useEffect, useState } from "react";
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

const IndexAvances = () => {
  const { userData } = useUser();
  const [avancesFiltradosArray, setAvancesFiltradosArray] = useState([]);
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
    data: queryAvances,
    error: errorAvances,
    loading: loadingAvances,
    refetch: refetchAvances,
  } = useQuery(OBTENER_AVANCES);

  useEffect(() => {
    console.log("todos avances", queryAvanceProyecto);
    if (avancesFiltradosArray.length !== 0) {
      avancesFiltradosArray.length = 0;
      console.log("array", avancesFiltradosArray);
    }
    refetchAvanceProyecto();
    if (avancesFiltradosArray.length === 0 && queryAvanceProyecto) {
      queryAvanceProyecto.AvancePorProyecto.map((u) => {
        u.proyecto.inscripciones.forEach((element) => {
          if (element.estudiante._id === userData._id) {
            avancesFiltradosArray.push(u);
          }
        });
      });
    }
    console.log("array llenado", avancesFiltradosArray);
  }, [queryAvanceProyecto, refetchAvanceProyecto]);

  useEffect(() => {
    refetchAvances();
  }, [refetchAvances]);

  useEffect(() => {
    if (errorAvances || errorAvanceProyecto) {
      toast.error("Error consultando los avances :(");
    }
  }, [errorAvances, errorAvanceProyecto]);

  if (loadingAvances || loadingAvanceProyecto) {
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
        <div className="flex flex-col justify-center items-center">
          <div className="table-container">
            {userData.rol === "ADMINISTRADOR" && (
              <>
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
              </>
            )}
            {userData.rol === "LIDER" && (
              <>
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
                        if (u.proyecto.lider._id === userData._id) {
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
                                    <Typography className="pr-2">
                                      Ver
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Typography>{u.observaciones}</Typography>
                                  </AccordionDetails>
                                </Accordion>
                              </td>
                              <td>
                                {u.creadoPor.nombre +
                                  " " +
                                  u.creadoPor.apellido}
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
                        }
                      })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
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
            <Link to="registrar" className="btn-general-submit text-xl">
              Registrar Avance
            </Link>
          </PrivateComponent>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="table-container">
            {userData.rol === "ESTUDIANTE" && (
              <>
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
                    {avancesFiltradosArray &&
                      avancesFiltradosArray.map((i) => {
                        console.log(avancesFiltradosArray.indexOf(i), i._id);
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
                              <Link
                                to={`actualizar/${i._id}`}
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
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default IndexAvances;
