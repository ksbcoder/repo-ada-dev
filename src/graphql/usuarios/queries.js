import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
      estado
    }
  }
`;

const GET_USUARIOS_ESTUDIANTES = gql`
  query UsuariosEstudiantes{
    UsuariosEstudiantes {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
`;

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
      estado
    }
  }
`;

export { GET_USUARIOS, GET_USUARIOS_ESTUDIANTES, GET_USUARIO };
