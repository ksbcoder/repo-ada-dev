import {gql} from '@apollo/client';

const CREAR_PROYECTO=gql`
    mutation crearProyecto(
        $nombre: String!
        $presupuesto: Float!
        $fechaInicio: Date!
        $lider: String!
        $objetivos:[crearObjetivo]
    ) {
        crearProyecto(
            nombre: $nombre
            presupuesto: $presupuesto
            fechaInicio: $fechaInicio
            lider: $lider
            objetivos: $objetivos
        ) {
          _id  
          nombre    
    }
  }
`;
const EDITAR_PROYECTO = gql`
  mutation EditarProyecto(
    
  )
`

export {CREAR_PROYECTO}