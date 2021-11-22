import React from "react";
import { Link } from "react-router-dom";

const IndexProyectos = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-blue-500 p-8">
        <h2 className="text-2x1 font-extrabold text-gray-800">Registro de proyectos</h2>
      </div>
      <div className=" p-4 flex flex-col items-center justify-center">
      <form className="flex flex-col">
        <label className="flex flex-col" htmlFor="nombre">
          Nombre del proyecto
        <input name ="nombre" className="border box-border rounded p-1 w-96" type="text" placeholder="Introduzca el nombre"/>
        </label>
        <label className="flex flex-col" htmlFor="objetivo general">
          Objetivo general
        <input name ="objetivo general" className="border box-border rounded p-1" type="text" placeholder="Introduzca el objetivo general"/>
        </label>
        <label className="flex flex-col" htmlFor="objetivo especifico">
          Objetivo específico
        <input name ="objetivo especifico" className="border box-border rounded p-1" type="text" placeholder="Introduzca el objetivo específico"/>
        </label>
        <label className="flex flex-col" htmlFor="">
          Presupuesto
        <input className="border box-border rounded p-1" type="number" placeholder="0"/>
        </label>
        <label className="flex flex-col" htmlFor="">
          Fecha inicio
        <input className="border box-border rounded p-1" type="text" placeholder="Introduzca el nombre"/>
        </label>
        <label className="flex flex-col" htmlFor="">
          Fecha finalización
        <input className="border box-border rounded p-1" type="text" placeholder="Introduzca el nombre"/>
        </label>
        <label className="flex flex-col" htmlFor="">
          Identificación
        <input className="border box-border rounded p-1" type="text" placeholder="Introduzca la identificación"/>
        </label>
          <button className="border box-border rounded p-1 w-60">Crear proyecto</button>
        </form>

      </div>
     
      <Link to='page1'> aqui va el link a CategoryPage1</Link>


    </div>
  );
};

export default IndexProyectos;
