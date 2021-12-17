import { gql } from "@apollo/client";

const OBTENER_INSCRIPCIONES = gql`
  query ConsultarInscripciones {
    consultarInscripciones {
      _id
      estado
      fechaInscripcion
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
      estudiante {
        _id
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_INSCRIPCION = gql`
  query ConsultarInscripcionPorId($id: String!) {
    consultarInscripcionPorId(_id: $id) {
      _id
      estado
      fechaInscripcion
      fechaIngreso
      fechaEgreso
      proyecto {
        nombre
      }
      estudiante {
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_INSCRIPCIONES_PROYECTO = gql`
  query ConsultarInscripcionesPorProyecto($projectId: String!) {
    consultarInscripcionesPorProyecto(projectId: $projectId) {
      _id
      estado
      fechaInscripcion
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
      estudiante {
        _id
        nombre
        apellido
      }
    }
  }
`;

const OBTENER_INSCRIPCIONES_ESTUDIANTE = gql`
  query ConsultarInscripcionesPorEstudiante($estudianteId: String!) {
    consultarInscripcionesPorEstudiante(estudianteId: $estudianteId) {
      _id
      estado
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
    }
  }
`;

const OBTENER_INSCRIPCIONES_LIDER = gql`
  query ConsultarInscripcionesPorLider {
    consultarInscripcionesPorLider {
      _id
      estado
      fechaInscripcion
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
        nombre
      }
      estudiante {
        _id
        nombre
        apellido
      }
    }
  }
`;

export {
  OBTENER_INSCRIPCIONES,
  OBTENER_INSCRIPCION,
  OBTENER_INSCRIPCIONES_PROYECTO,
  OBTENER_INSCRIPCIONES_ESTUDIANTE,
  OBTENER_INSCRIPCIONES_LIDER,
};
