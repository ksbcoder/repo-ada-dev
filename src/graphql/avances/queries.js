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

export { OBTENER_AVANCES };
