import { gql } from "@apollo/client";

const CREAR_PROYECTO=gql`
    mutation crearProyecto(
        $nombre: String!
        $presupuesto: Float!
        $fechaInicio: Date!
        $lider: String!
        $objetivos:[crearObjetivo]!
    ) {
      _id
      nombre
    }
  }
`;
const EDITAR_PROYECTO_ADMIN = gql`
  mutation EditarProyectoAdmin(
    $_id: String!
    $estado: Enum_EstadoProyecto
    $fase: Enum_FaseProyecto
  ) {
    editarProyectoAdmin(_id: $_id, estado: $estado, fase: $fase) {
      fechaInicio
      fechaFin
      estado
      fase
    }
  }
`;
const EDITAR_PROYECTO_LIDER = gql`
  mutation EditarProyectoLider(
    $_id: String!
    $nombre: String
    $presupuesto: Float
  ) {
    editarProyectoLider(_id: $_id, nombre: $nombre, presupuesto: $presupuesto) {
      _id
      nombre
      presupuesto
    }
  }
`;
const EDITAR_OBJETIVO = gql`
  mutation EditarObjetivo(
    $idProyecto: String!
    $indexObjetivo: Int!
    $campos: camposObjetivo
  ) {
    editarObjetivo(
      idProyecto: $idProyecto
      indexObjetivo: $indexObjetivo
      campos: $campos
    ) {
      objetivos {
        _id
        descripcion
        tipo
      }
    }
  }
`;
//const ELIMINAR_OBJETIVO = gql`

//`

const CREAR_INSCRIPCION = gql`
  mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      _id
      estado
      fechaInscripcion
    }
  }
`;

export {
  CREAR_PROYECTO,
  EDITAR_PROYECTO_LIDER,
  EDITAR_PROYECTO_ADMIN,
  EDITAR_OBJETIVO,
  CREAR_INSCRIPCION,
};
