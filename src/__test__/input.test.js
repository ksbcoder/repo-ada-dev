import React from 'react';
import Input from 'components/Input';
import {render, screen, cleanup} from '@testing-library/react';

afterEach(cleanup);
it('input ok', () =>{
    render(<Input label='Nombre Usuario' name='nombre' defaultValue='Jose' type='text' required={true} isDisabled={false} />);
    expect(screen.getByTestId('input')).toBeInTheDocument();    
});



