import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import { CREAR_USUARIO } from 'graphql/usuarios/mutations';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';


const IndexInscripciones = () => {
  return <div>Index Inscripciones</div>;
};

export default IndexInscripciones;
