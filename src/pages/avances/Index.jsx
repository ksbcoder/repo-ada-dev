import React from "react";
import { Link } from "react-router-dom";

const IndexAvances = () => {
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
              <tr>
                <td>a</td>
                <td>b</td>
                <td>c</td>
                <td>d</td>
                <td>e</td>
                <td>f</td>
              </tr>
              <tr>
                <td>a</td>
                <td>b</td>
                <td>c</td>
                <td>d</td>
                <td>e</td>
                <td>f</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndexAvances;
