import React from 'react'

const GestionUsuarios = () => {
    return (
        <div>
            Gestión de usuarios
        </div>,
        <div className= "table-container">            
            <table className= "table-list">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Identificación</th>
                        <th>Tipo de Usuario</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Juan</td>
                        <td>1116254874</td>
                        <td>Administrador</td>
                        <td>Juan@gmail.com</td>
                        <td>
                            <button className="btn-editar">Editar</button>
                            <button className= "btn-eliminar">Eliminar</button>
                        </td>
                    </tr>
                </tbody>

            </table>       

        </div>
      
    )
}

export default GestionUsuarios
