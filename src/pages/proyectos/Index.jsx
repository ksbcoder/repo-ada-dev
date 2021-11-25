import React from "react";
import { Link } from "react-router-dom";

const IndexProyectos = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center navbar">
        <h1 className="letra poppins">Registro de proyectos</h1>
      </div>
        <form className=" py-4 flex flex-col items-center justify-center">
          <label className="flex flex-col letra poppins p-2" htmlFor="nombre">
            Nombre del proyecto
            <input name ="nombre" className="border box-border rounded p-1 w-96" type="text" placeholder="Introduzca el nombre"/>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="objetivo general">
            Objetivo general
            <input name ="objetivo general" className="border box-border rounded p-1 w-96" type="text" placeholder="Introduzca el objetivo general"/>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="objetivo especifico">
            Objetivo específico
            <input name ="objetivo especifico" className="border box-border rounded p-1 w-96" type="text" placeholder="Introduzca el objetivo específico"/>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="presupuesto">
            Presupuesto
            <input name ="presupuesto" className="border box-border rounded p-1 w-96" type="number" placeholder="0"/>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="fecha inicio">
            Fecha inicio
            <input name ="fecha inicio" className="border box-border rounded p-1 w-96" type="date"/>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="fecha fin">
            Fecha finalización
            <input name ="fecha fin" className="border box-border rounded p-1 w-96" type="date"/>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="estado">
            Estado
            <select name ="estado" className="border box-border rounded p-1 w-96">
              <option value="">INACTIVO</option>
              <option value="">ACTIVO</option>
            </select>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="fase">
            Fase
            <select name ="fase" className="border box-border rounded p-1 w-96">
              <option value="">NULO</option>
              <option value="">INICIADO</option>
              <option value="">DESARROLLO</option>
              <option value="">TERMINADO</option>
            </select>
          </label>
          <label className="flex flex-col letra poppins p-2" htmlFor="lider">
            Líder
            <input name ="lider" className="border box-border rounded p-1 w-96" type="text" placeholder="Introduzca identificación"/>
          </label>
            <button className="color poppins text-white border box-border rounded p-4 w-60 h-auto px-3 py-2 transition-all shadow-xl">Crear proyecto</button>
        </form>
      <Link to='page1'> aqui va el link a CategoryPage1</Link>
    </div>
  );
};

export default IndexProyectos;
