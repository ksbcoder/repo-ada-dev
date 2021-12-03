import { gql } from "@apollo/client";

const OBTENER_AVANCES = gql`
  query Avances {
    Avances {
      _id
      descripcion
      observaciones
      fechaAvance
      proyecto {
        _id
        nombre
        fase
        estado
        lider {
          _id
          nombre
        }
      }
      creadoPor {
        _id
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
        fase
        estado
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
        fase
        estado
      }
      creadoPor {
        _id
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_AVANCES_POR_PROYECTO = gql`
  query AvancePorProyecto {
    AvancePorProyecto {
      _id
      descripcion
      observaciones
      fechaAvance
      proyecto {
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
      creadoPor {
        _id
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_PROYECTOS = gql`
  query Proyectos {
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

const OBTENER_PROYECTOS_LITE = gql`
  query ProyectosRegistrar {
    ProyectosRegistrar {
      _id
      nombre
    }
  }
`;

export {
  OBTENER_AVANCES,
  OBTENER_AVANCE,
  OBTENER_AVANCES_POR_USUARIO,
  OBTENER_AVANCES_POR_PROYECTO,
  OBTENER_PROYECTOS,
  OBTENER_PROYECTOS_LITE,
};
