import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import Logo from './img/Logito_completo.png';
const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { form, formData, updateFormData } = useFormData();
    const [loginError, setLoginError]=useState('');
    const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
        useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

    useEffect(() => {
        setLoginError('');
        if (dataMutation) {
            if (dataMutation.login.token!=null) {
                setToken(dataMutation.login.token);
                navigate('/');
            }else if(dataMutation.login.error!=null)
            {
                setLoginError(dataMutation.login.error);
            }
        }
    }, [dataMutation, setToken, navigate, form, formData, updateFormData]);
    return (
        <>
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full bg-blue-200"
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
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div class='flex items-center justify-center'>
                                            <img src={Logo} alt="..." className="text-center" />
                                        </div>
                                        <hr className="mt-6 border-b-1 border-gray-400" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                                            <div className="relative w-full mb-3">
                                                {loginError !== '' ? <label
                                                    className="block text-red-600 text-xs font-bold mb-2 text-center"
                                                >  {loginError}
                                                </label> : <></>}
                                                <label
                                                    className="block text-gray-700 text-xs font-bold mb-2"
                                                >
                                                    Correo
                                                </label>
                                                <input
                                                    name="correo"
                                                    type="email"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Correo"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>

                      <div className="relative w-full mb-3">
                        <label className="block text-gray-700 text-xs font-bold mb-2">
                          Contraseña
                        </label>
                        <input
                          name="password"
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Contraseña"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-green-700 text-white hover:bg-green-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Iniciar sesión
                        </button>
                      </div>
                    </form>
                    <div className="flex flex-wrap mt-6 items-center justify-center">
                      <div className="w-1/2 text-center">
                        <Link className="text-blue-500" to="/usuarios">
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
  );
};

export default Login;
