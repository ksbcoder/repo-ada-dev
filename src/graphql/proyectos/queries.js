import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
    query Proyectos {
        Proyectos {
            _id
            nombre
            presupuesto
            fechaInicio
            fechaFin
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

const GET_PROYECTO = gql`
query LeerProyecto($_id: String!) {
  LeerProyecto(_id: $_id) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    objetivos {
      _id
      descripcion
      tipo
    }
  }
}
`;
export {GET_PROYECTOS, GET_PROYECTOS_LIDERADOS, GET_PROYECTO};