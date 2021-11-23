import React from 'react';
import { Link } from "react-router-dom";
import Logo from './img/Logito_completo.png';
const Login = () => {
    return (
        <>
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900"
                        style={{
                            backgroundImage:
                                "url(" + require("./img/Fondo.png").default + ")",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat"
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div class='flex items-center justify-center'>
                                            <img src={Logo} alt="..." className="text-center" />
                                        </div>
                                        <hr className="mt-6 border-b-1 border-gray-400" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block text-gray-700 text-xs font-bold mb-2"
                                                >
                                                    Correo
                                                </label>
                                                <input
                                                    type="email"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Correo"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block text-gray-700 text-xs font-bold mb-2"
                                                >
                                                    Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Contraseña"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>
                                            <div className="text-center mt-6">
                                                <Link
                                                    className="bg-green-700 text-white hover:bg-green-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                    to="/"
                                                >
                                                    Iniciar sesión
                                                </Link>
                                            </div>
                                        </form>
                                        <div className="flex flex-wrap mt-6 items-center justify-center"> 
                                            <div className="w-1/2 text-center">
                                                <Link
                                                    className="text-blue-500"
                                                    to="/usuarios"
                                                >
                                                    <small className="text-base">Registrarse</small>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
};

export default Login;