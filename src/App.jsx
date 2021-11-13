import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from "context/userContext";
import Index from "pages/Index";
import IndexProyectos from "pages/proyectos/Index";
import Category1 from "pages/proyectos/CategoryPage1";
import IndexInscripciones from "pages/inscripciones/Index";
import IndexUsuarios from "pages/usuarios/Index";
import IndexAvances from "pages/avances/Index";
import RegistrarAvance from "pages/avances/RegistrarAvance";
import ActualizarAvance from "pages/avances/ActualizarAvance";
import Perfil from "pages/usuarios/Perfil";
// import PrivateRoute from 'components/PrivateRoute';

function App() {
  const [userData, setUserData] = useState({});

  return (
    
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateLayout />}>
              <Route path="" element={<Index />} />
              <Route path="usuarios" element={<IndexUsuarios />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="proyectos" element={<IndexProyectos />} />
              <Route path="proyectos/page1" element={<Category1 />} />
              <Route path="inscripciones" element={<IndexInscripciones />} />
              <Route path="avances" element={<IndexAvances />} />
              <Route path="avances/registrar" element={<RegistrarAvance />} />
              <Route path="avances/actualizar" element={<ActualizarAvance />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    
  );
}

export default App;
