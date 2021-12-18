import React from "react";
import PrivateComponent from "components/PrivateComponent";
import { render, screen, cleanup } from "@testing-library/react";
import { UserContext } from "context/userContext";

afterEach(cleanup);

it("NO renderizar componente si no tiene el rol adecuado", () => {
  // Usado en modulo de avances para no mostrar el boton "Registrar Avance" a un usuario con rol 'LIDER'
  render(
    <UserContext.Provider value={{ userData: { rol: "LIDER" } }}>
      <PrivateComponent roleList={["ADMINISTRADOR", "ESTUDIANTE"]}>
        autorizado
      </PrivateComponent>
    </UserContext.Provider>
  );
  expect(screen.getByTestId("no-autorizado")).toBeInTheDocument();
});
