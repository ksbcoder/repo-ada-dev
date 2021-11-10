import React from "react";

const RegistrarAvance = () => {
  return (
    <div>
      <div className="text-center mt-28">
        <span className="titulo-general">
          Registro de Avances
        </span>
      </div>
      <form className="flex flex-col items-center mt-10">
        <div className="grid grid-cols-2 w-1/2">
          <div className="form-general">
            <span className='pr-2'>Proyecto</span>
            <select
              name="proyecto"
              type="text"
              defaultValue=""
              className="input-general"
              required
            >
              <option value="" disabled>
                Seleccione...
              </option>
              <option value="En proceso">Proyecto 1</option>
            </select>
          </div>
          <div className="form-general">
            <span className='pr-2'>Fecha</span>
            <input
              type="datetime-local"
              name="fecha"
              className="input-general"
              required
            />
          </div>
          <div className="form-general">
            <span className='pr-2'>Descripción</span>
            <input
              type="text"
              name="descripcion"
              className="input-general"
              required
            />
          </div>
          <div className="form-general">
            <span className='pr-2'>Observaciones</span>
            <input
              type="text"
              name="observaciones"
              className="input-general"
              required
            />
          </div>
        </div>
        <div className="form-general">
            <span className='pr-2'>Creado por</span>
            <select
              name="creadoPor"
              type="text"
              defaultValue=""
              className="input-general"
              required
            >
              <option value="" disabled>
                Seleccione...
              </option>
              <option value="En proceso">Usuario 1</option>
            </select>
          </div>
          <div className="form-general">
            <button className='btn-general mt-4 text-xl'>Registrar</button>
          </div>
      </form>
    </div>
  );
};

export default RegistrarAvance;
