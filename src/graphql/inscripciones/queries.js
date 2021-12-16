import { gql } from "@apollo/client";

const OBTENER_INSCRIPCIONES_ESTUDIANTE = gql `
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

export{OBTENER_INSCRIPCIONES_ESTUDIANTE}