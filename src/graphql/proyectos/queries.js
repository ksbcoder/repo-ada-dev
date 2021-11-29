import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
    query Proyectos {
        Proyectos {
            _id
            nombre
            presupuesto
            fechaInicio
            
            
        }
    }
`;

export {GET_PROYECTOS};