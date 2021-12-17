import React from 'react';
import ModalAvan from 'components/ModalAvan';
import {render, screen} from '@testing-library/react';


it('muestra texto cuando no hay avances', ()=>{
    render(<ModalAvan avances={''}/>)
    expect(screen.getByTestId('sin-avances')).toHaveTextContent(
        'No hay avances que mostrar'
    );
});