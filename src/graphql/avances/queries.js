import { gql } from "@apollo/client";

const OBTENER_AVANCES = gql`
  query QAvances {
    Avances {
      _id
      descripcion
      observaciones
      fechaAvance
      proyecto {
        nombre
      }
      creadoPor {
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_AVANCE = gql`
  query Avance($_id: String!) {
    Avance(_id: $_id) {
      _id
      descripcion
      observaciones
      fechaAvance
      proyecto {
        _id
        nombre
      }
      creadoPor {
        _id
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_AVANCES_POR_USUARIO = gql`
  query AvancePorUsuario($_id: String!) {
    AvancePorUsuario(_id: $_id) {
      _id
      descripcion
      observaciones
      fechaAvance
      proyecto {
        _id
        nombre
      }
      creadoPor {
        _id
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_PROYECTOS = gql`
  query QProyectos {
    Proyectos {
      _id
      nombre
      fase
      estado
      inscripciones {
        _id
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

export {
  OBTENER_AVANCES,
  OBTENER_AVANCE,
  OBTENER_AVANCES_POR_USUARIO,
  OBTENER_PROYECTOS,
};
