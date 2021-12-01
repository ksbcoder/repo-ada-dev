import {gql} from '@apollo/client';

const CREAR_PROYECTO=gql`
    mutation crearProyecto(
        $nombre: String!
        $presupuesto: Float!
        $fechaInicio: Date!
        $estado: Enum_EstadoProyecto!
        $fase: Enum_FaseProyecto!
        $lider: String!
    ) {
        crearProyecto(
            nombre: $nombre
            presupuesto: $presupuesto
            fechaInicio: $fechaInicio
            estado: $estado
            fase: $fase
            lider: $lider
        ) {
          _id  
          nombre    
    }
  }
`

export {CREAR_PROYECTO}