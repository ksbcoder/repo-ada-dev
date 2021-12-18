import React, { useState, useEffect } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Index from "pages/Index";
import IndexProyectos from "pages/proyectos/Index";
import ActualizarProyectos from "pages/proyectos/ActualizarProyectos";
import IndexInscripciones from "pages/inscripciones/Index";
import ActualizarInscripcion from "pages/inscripciones/ActualizarInscripcion";
import IndexUsuarios from "pages/usuarios/Index";
import IndexAvances from "pages/avances/Index";
import InfoInscripcionUsuario from "pages/usuarios/InfoInscripcionUsuarios";
import RegistrarAvance from "pages/avances/RegistrarAvance";
import ActualizarAvance from "pages/avances/ActualizarAvance";
import Perfil from "pages/usuarios/Perfil";
import GestionUsuarios from "pages/usuarios/GestionUsuarios";
import EditarUsuario from "pages/usuarios/Editar";
import Login from "pages/login/Login";
import Registro from "pages/login/Registro";
import RegistroProyectos from "pages/proyectos/RegistroProyectos";
import ProyectoInscripciones from "pages/proyectos/ProyectoInscripciones";
import { AuthContext } from "context/authContext";
import jwt_decode from "jwt-decode";

const httpLink = createHttpLink({
  //uri: "https://adasoft-server.herokuapp.com/graphql",
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem("token"));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        estado: decoded.estado,
        rol: decoded.rol,
      });
    }
  }, [authToken]);
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<Index />} />
                <Route path="usuarios" element={<IndexUsuarios />} />

                <Route
                  path="usuarios/gestionUsuarios"
                  element={<GestionUsuarios />}
                />
                <Route
                  path="usuarios/editar/:_id"
                  element={<EditarUsuario />}
                />
                <Route
                  path="usuarios/infoInscripcionUsuario/:_id"
                  element={<InfoInscripcionUsuario />}
                />

                <Route path="perfil" element={<Perfil />} />

                <Route path="proyectos" element={<IndexProyectos />} />
                <Route
                  path="proyectos/RegistroProyectos"
                  element={<RegistroProyectos />}
                />
                <Route
                  path="proyectos/ActualizarProyectos/:_id"
                  element={<ActualizarProyectos />}
                />
                <Route
                  path="proyectos/ProyectoInscripciones/:_id" element={<ProyectoInscripciones/>}
                />
                <Route path="inscripciones" element={<IndexInscripciones />} />
                <Route
                  path="inscripciones/ActualizarInscripcion/:_id" element={<ActualizarInscripcion/>}
                />
                <Route path="avances" element={<IndexAvances />} />
                <Route path="avances/registrar" element={<RegistrarAvance />} />
                <Route
                  path="avances/actualizar/:_id"
                  element={<ActualizarAvance />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
