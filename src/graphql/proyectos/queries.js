import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
    query Proyectos {
        Proyectos {
            _id
            nombre
            presupuesto
            fechaInicio
            estado
            fase
            objetivos {
              _id
              tipo
              descripcion
            }
            avances {
              _id
              descripcion
              fechaAvance
            }
            
        }
    }
`;

export {GET_PROYECTOS};