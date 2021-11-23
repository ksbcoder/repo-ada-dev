import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Index from "pages/Index";
import IndexProyectos from "pages/proyectos/Index";
import IndexInscripciones from "pages/inscripciones/Index";
import IndexUsuarios from "pages/usuarios/Index";
import IndexAvances from "pages/avances/Index";
import RegistrarAvance from "pages/avances/RegistrarAvance";
import ActualizarAvance from "pages/avances/ActualizarAvance";
import Perfil from "pages/usuarios/Perfil";
import GestionUsuarios from "pages/usuarios/GestionUsuarios";
import Login from "pages/login/Login";

// import PrivateRoute from 'components/PrivateRoute';
/* const httpLink = createHttpLink({
  uri: "https://adasoft-server.herokuapp.com/graphql" ,
}); */

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({});

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateLayout />}>
              <Route path="" element={<Index />} />
              <Route path="usuarios" element={<IndexUsuarios />} />

              <Route
                path="usuarios/gestionUsuarios"
                element={<GestionUsuarios />}
              />

              <Route path="perfil" element={<Perfil />} />

              <Route path="proyectos" element={<IndexProyectos />} />
              <Route path="inscripciones" element={<IndexInscripciones />} />
              <Route path="avances" element={<IndexAvances />} />
              <Route path="avances/registrar" element={<RegistrarAvance />} />
              <Route path="avances/actualizar" element={<ActualizarAvance />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
