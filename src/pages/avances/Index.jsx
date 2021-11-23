import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { OBTENER_AVANCES } from "graphql/avances/queries";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IndexAvances = () => {
  const { data, error, loading } = useQuery(OBTENER_AVANCES);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los avances");
    }
  }, [error]);

  return (
    <div>
      <div className="text-center mt-20">
        <span className="titulo-general">Avances</span>
      </div>
      <div className="flex flex-row-reverse flex-nowrap mr-8 mt-5 gap-2">
        <Link to="actualizar" className="btn-general">
          Actualizar Avance
        </Link>
        <Link to="registrar" className="btn-general">
          Registrar Avance
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center mt-2">
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
              </tr>
            </thead>
            <tbody>
              {data &&
                data.Avances.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u._id}</td>
                      <td>{u.proyecto.nombre}</td>
                      <td>{u.fechaAvance}</td>
                      <td>{u.descripcion}</td>
                      <td>{u.observaciones}</td>
                      <td>{u.creadoPor.nombre + " " + u.creadoPor.apellido}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndexAvances;
