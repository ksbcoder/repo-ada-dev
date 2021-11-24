import { React, useState } from 'react'
import Indicador from '../../components/Indicador';
const Perfil = () => {
    const [modalContraseña, setModalContraseña] = useState(false);
    const [modalDatos, setModalDatos] = useState(false);
    const [contraseña, setContraseña]=useState('');
    const [confirmarcontraseña, setConfirmarContraseña]=useState('');
    return (
        <>
            <nav className="navbar">
                <h1>Perfil usuario</h1>
            </nav>
            <div className="relative justify-center py-4  bg-gray-300">
                <div className="container px-4 justify-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="text-center mt-12">
                                    <i class="fas fa-user fa-5x"></i>
                                    <h3 className="text-2xl font-semibold leading-normal mb-2 text-gray-800">
                                        Pepito Pérez
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                        <i className="fas fa-user-graduate mr-2 text-lg text-gray-500"></i>{" "}
                                        Rol: Estudiante
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 py-5 border-t border-gray-300">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <form className="bg-indigo shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
                                            <div className="m-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="identificacion"
                                                >
                                                    Identificación
                                                </label>
                                                <input
                                                    className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                    type="text"
                                                    id="identificacion"
                                                    placeholder="Identificación"
                                                    disabled
                                                    value="12312323"
                                                />
                                            </div>
                                            <div className="m-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="correo"
                                                >
                                                    Correo
                                                </label>
                                                <input
                                                    className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                    type="email"
                                                    id="correo"
                                                    placeholder="Correo"
                                                    disabled
                                                    value="pepito@correo.com"
                                                />
                                            </div>
                                            <div className="m-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="estado"
                                                >
                                                    Estado
                                                </label>
                                                <input
                                                    className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                    type="text"
                                                    id="estado"
                                                    placeholder="Estado"
                                                    disabled
                                                    value="Autorizado"
                                                />
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <button class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setModalContraseña(true)}>
                                                    Cambiar contraseña
                                                </button>
                                                <button class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setModalDatos(true)}>
                                                    Actualizar datos
                                                </button>
                                            </div>
                                        </form>
                                        {/*Modal actualizar contraseña*/}
                                        {modalContraseña ? (
                                            <>
                                                <div
                                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                >
                                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        {/*content*/}
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                            {/*header*/}
                                                            <div className="bg-green-700 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                                <h3 className="text-3xl text-white font-semibold">
                                                                    Cambiar contraseña
                                                                </h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    onClick={() => setModalContraseña(false)}
                                                                >
                                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                        ×
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            {/*body*/}

                                                            <form className="rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
                                                                <div className="m-4">
                                                                    <label
                                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                                        htmlFor="contraseña"
                                                                    >
                                                                        Nueva contraseña
                                                                    </label>
                                                                    <input
                                                                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                                        type="password"
                                                                        id="nuevacontraseña"
                                                                        placeholder="Constraseña"
                                                                        onChange={(e)=>setContraseña(e.target.value)}
                                                                    />
                                                                    <Indicador password={contraseña}/>
                                                                </div>
                                                                <div className="m-4">
                                                                    <label
                                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                                        htmlFor="confircontraseña"
                                                                    >
                                                                        Confirmar contraseña
                                                                    </label>
                                                                    <input
                                                                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                                        type="password"
                                                                        id="Confircontraseña"
                                                                        placeholder="Confirmar contraseña"
                                                                        onChange={(e)=>setConfirmarContraseña(e.target.value)}
                                                                    />
                                                                </div>
                                                                {/*footer*/}
                                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                                    <button
                                                                        className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                        type="button"
                                                                        onClick={() => setModalContraseña(false)}
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                    <button
                                                                        className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline"
                                                                        type="button"
                                                                        onClick={() => setModalContraseña(false)}
                                                                    >
                                                                        Actualizar
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}
                                        {/*Modal actualizar datos*/}
                                        {modalDatos ? (
                                            <>
                                                <div
                                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                >
                                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        {/*content*/}
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                            {/*header*/}
                                                            <div className="bg-green-700 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                                <h3 className="text-3xl text-white font-semibold">
                                                                    Actualizar Datos
                                                                </h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    onClick={() => setModalDatos(false)}
                                                                >
                                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                        ×
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            {/*body*/}

                                                            <form className="rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
                                                                <div className="m-4">
                                                                    <label
                                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                                        htmlFor="identificacion"
                                                                    >
                                                                        Identificación
                                                                    </label>
                                                                    <input
                                                                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                                        type="text"
                                                                        id="identificacion"
                                                                        placeholder="Identificación"

                                                                    />
                                                                </div>
                                                                <div className="m-4">
                                                                    <label
                                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                                        htmlFor="nombre"
                                                                    >
                                                                        Nombre
                                                                    </label>
                                                                    <input
                                                                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                                        type="text"
                                                                        id="nombre"
                                                                        placeholder="Nombre"

                                                                    />
                                                                </div>
                                                                <div className="m-4">
                                                                    <label
                                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                                        htmlFor="apellido"
                                                                    >
                                                                        Apellido
                                                                    </label>
                                                                    <input
                                                                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                                        type="text"
                                                                        id="apellido"
                                                                        placeholder="Apellido"

                                                                    />
                                                                </div>
                                                                <div className="m-4">
                                                                    <label
                                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                                        htmlFor="correo"
                                                                    >
                                                                        Correo
                                                                    </label>
                                                                    <input
                                                                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                                                        type="email"
                                                                        id="correo"
                                                                        placeholder="Correo"

                                                                    />
                                                                </div>
                                                                {/*footer*/}
                                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                                    <button
                                                                        className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                        type="button"
                                                                        onClick={() => setModalDatos(false)}
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                    <button
                                                                        className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline"
                                                                        type="button"
                                                                        onClick={() => setModalDatos(false)}
                                                                    >
                                                                        Actualizar
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Perfil;

