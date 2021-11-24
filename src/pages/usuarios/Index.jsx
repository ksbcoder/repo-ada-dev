import React from 'react';

const IndexUsuarios = () => {
  return(
    <><nav className="navbar">
      <h1>Registro de Usuario</h1>
    </nav>
        <div className="form-usuario">
        <div className="form-campo">
          <div>
            <label>Nombre</label>
          </div>
          <input className="input-usuario" id="usuario-nombre"placeholder="Enter username" />
        </div>
        <div className="form-campo">
          <div>
            <label>Apellido</label>
          </div>
          <input className="input-usuario" id="usuario-apellido" placeholder="Enter lastname" />
        </div>
        <div className="form-campo">
          <div>
            <label>Identificación</label>
          </div>
          <input className="input-usuario" id="usuario-id" placeholder="Enter id" />
        </div>
        <div className="form-campo">
          <div>
            <label>Tipo de usuario</label>
          </div>
          <select className= "input-usuario" id="usuario-tipo">
            <option value = "ADMINISTRADOR">Administrador</option>
            <option value = "LIDER">Lider</option>
            <option value = "ESTUDIANTE">Estudiante</option>
          </select>          
        </div>
        <div className="form-campo">
          <div>
            <label>Correo</label>
          </div>
          <input className="input-usuario" type="email" id="usuario-correo" placeholder="Enter mail" />
        </div>
        <div className="form-campo">
          <div>
            <label>Password</label>
          </div>
          <input className="input-usuario" type="password" id="usuario-password"  placeholder="Enter password" />
        </div>
        <div className="form-campo">
          <div>
            <label>Confirmar Password</label>
          </div>
          <input className="input-usuario" type="password" placeholder="Enter password" />
        </div>
        <div className="form-campo">
          <button className="btn-general-usuario" id="usuario-registro">Registrarse</button>
        </div>
      </div></>
  );
};

export default IndexUsuarios;
