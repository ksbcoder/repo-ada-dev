import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Indicador from "components/Indicador";

afterEach(cleanup);

it("Renderiza el componente", ()=>{
    render(
        <Indicador password="12345"/>
    );
    expect(screen.getByTestId('Progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('Color-label')).toBeInTheDocument();
});
it("Cuando no haya niguna contraseña el texto debe ser 'Muy débil' y el color debe ser '#828282'", ()=>{
    render(
        <Indicador password=""/>
    );
    expect(screen.getByTestId('Color-label')).toHaveTextContent('Muy débil');
    expect(screen.getByTestId('Color-label')).toHaveStyle({color:"#828282"})
});
it("Cuando haya una contraseña segura el texto debe ser diferente de 'Muy débil' y el color diferente de '#828282'", ()=>{
    render(
        <Indicador password="R+cV124{"/>
    );
    expect(screen.getByTestId('Color-label')).not.toHaveTextContent('Muy débil');
    expect(screen.getByTestId('Color-label')).not.toHaveStyle({color:"#828282"})
});