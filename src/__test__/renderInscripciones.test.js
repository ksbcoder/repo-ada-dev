import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { UserContext } from "context/userContext";

afterEach(cleanup);

it("Renderizar ", () => {
  // Usado en modulo de inscripciones para mostrar los botones "Aprobar Inscripcion" y
  // "Rechazar Inscripcion" a un usuario con rol 'LIDER'
  render(
    <UserContext.Provider value={{ userData: { rol: "LIDER" } }}>
      <div></div>
    </UserContext.Provider>
  );
  expect(screen.getByTestId("aprobar-inscripcion")).toBeInTheDocument();
});
