import React from 'react';
import DropDown from "components/Dropdown";
import {render, screen, fireEvent, cleanup} from '@testing-library/react';

afterEach(cleanup);

it('Renderización okay', () =>{
    render(
        <DropDown 
        label="Nombre del label" 
        name= "nombre" 
        defaultValue= "NULO" 
        required={true} 
        options={['INICIADO', 'DESARROLLO', 'TERMINADO', 'NULO']}/> 
    );
expect(screen.getByTestId("select-option")).toBeInTheDocument();
});

it('Renderización okay', () =>{
    render(
        <DropDown 
        label="Nombre del label" 
        name= "nombre" 
        defaultValue= "NULO" 
        required={true} 
        options={['INICIADO', 'DESARROLLO', 'TERMINADO', 'NULO']}/> 
    );
expect(screen.getByTestId("select-option")).toBeInTheDocument();
});