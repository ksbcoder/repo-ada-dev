import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { UserContext } from "context/userContext";
import PrivateRoute from "components/PrivateRoute";

afterEach(cleanup);

it("Renderizar vista de inscripciones para rol LIDER ", () => {
  // Renderizar la vista de inscripciones para rol lider
  render(
    <UserContext.Provider value={{ userData: { rol: "LIDER" } }}>
      <PrivateRoute roleList={["LIDER"]}>
        <div>Page</div>
      </PrivateRoute>
    </UserContext.Provider>
  );
  expect(screen.getByTestId("authorized")).toBeInTheDocument();
});
