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

const GET_PROYECTOS_LIDERADOS = gql`
  query ProyectosLiderados($idLider: String!) {
    ProyectosLiderados(idLider: $idLider) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        nombre
      }
      objetivos {
        descripcion
        tipo
      }
      avances {
        _id
        descripcion
      }
    }
  }
`;
export {GET_PROYECTOS, GET_PROYECTOS_LIDERADOS};