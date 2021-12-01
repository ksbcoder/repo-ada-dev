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
            lider {
              _id  
              }
            objetivos {
              _id
            }
            avances {
              _id
            }
            
        }
    }
`;

export {GET_PROYECTOS};