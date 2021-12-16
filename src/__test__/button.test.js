import React from 'react';
import ButtonLoading from 'components/ButtonLoading';
import {render, screen, cleanup} from '@testing-library/react';

afterEach(cleanup);
it('Renders okay', () =>{
    render(<ButtonLoading text='hola' loading={false} disabled={false}/>);
    expect(screen.getByTestId('button-loading')).toBeInTheDocument();
});

it('Disabled button', () =>{
    render(<ButtonLoading text='hola' loading={false} disabled={true}/>);
    expect(screen.getByTestId('button-loading')).toBeInTheDocument();
});

it('show text when not loading', () =>{
    render(<ButtonLoading text='hola' loading={false} disabled={false}/>);
    expect(screen.getByTestId('button-loading')).toHaveTextContent('hola');
});

it('Doesnt show text when loading', () =>{
    render(<ButtonLoading text='hola' loading={true} disabled={false}/>);
    expect(screen.getByTestId('button-loading')).not.toHaveTextContent('hola');
});

it('Shows loading compenent when loading', () =>{
    render(<ButtonLoading text='hola' loading={true} disabled={false}/>);
    expect(screen.getByTestId('loading-in-button')).toBeInTheDocument();
});

it('Shows loading compenent when loading', () =>{
    render(<ButtonLoading text='hola' loading={true} disabled={false}/>);
    expect(screen.getByTestId('loading-in-button')).toBeInTheDocument();
});

it('is disbled when prop is passed', ()=>{
    render(<ButtonLoading text='hola' loading={true} disabled={true}/>);
    expect(screen.getByTestId('button-loading')).toHaveAttribute('disabled');
});

it('is enabled when disbled prop is passed', ()=>{
    render(<ButtonLoading text='hola' loading={true} disabled={false}/>);
    expect(screen.getByTestId('button-loading')).not.toHaveAttribute('disabled');
});



