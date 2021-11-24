import React from 'react'

const GestionUsuarios = () => {
    return (
        <><nav className="navbar">
            <h1>Gestión de Usuarios</h1>
        </nav>
            <div className="table-container">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Tipo de Usuario</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Juan</td>
                            <td>1116254874</td>
                            <td>Administrador</td>
                            <td>Juan@gmail.com</td>
                            <td>PENDIENTE</td>
                            <td>
                                <button className="btn-editar"><i className="fas fa-user-edit"></i></button>
                                <button className="btn-eliminar"><i className="fas fa-user-minus"></i></button>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div></>
      
    );
};

export default GestionUsuarios
