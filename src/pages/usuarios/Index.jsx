import React from 'react';

const IndexUsuarios = () => {
  return( 
  <div>
  <h1>Página de Registro</h1>
  <h2>Ingreso al sistema de información</h2>
  
  </div>,
  <div className="form-usuario">
    <div className= "form-campo">
      <div>
        <label>Nombre Completo</label>
      </div>    
      <input className="input-usuario" placeholder="Enter username"/>
    </div>
    <div className= "form-campo">
      <div>
        <label>Identificación</label>
      </div>    
      <input className="input-usuario" placeholder="Enter id"/>
    </div>
    <div className= "form-campo">
      <div>
        <label>Tipo de usuario</label>
      </div>    
      <input className="input-usuario" placeholder="Enter user"/>
    </div>
    <div className= "form-campo">
      <div>
        <label>Correo</label>
      </div>    
      <input className="input-usuario" placeholder="Enter mail"/>
    </div>
    <div className= "form-campo">
      <div>
        <label>Password</label>
      </div>    
      <input className="input-usuario" placeholder="Enter password"/>
    </div>
    <div className= "form-campo">
    <button className="btn-general-usuario">Registrarse</button>
    </div>
    
  </div>
  

  )};

export default IndexUsuarios;
