const Enum_Rol = {
    ADMINISTRADOR: 'ADMINISTRADOR',
    ESTUDIANTE: 'ESTUDIANTE',
    LIDER: 'LÍDER',
  };
  
  const Enum_EstadoUsuario = {
    PENDIENTE: 'PENDIENTE',
    AUTORIZADO: 'AUTORIZADO',
    NO_AUTORIZADO: 'NO AUTORIZADO',
  };

  const Enum_TipoObjetivo = {
    GENERAL: 'General',
    ESPECIFICO: 'Especifico'
  };

  const Enum_EstadoProyecto = {
    ACTIVO: "ACTIVO", 
    INACTIVO: "INACTIVO",
  };

  const Enum_FaseProyecto = {
    INICIADO: "INICIADO", 
    DESARROLLO: "DESARROLLO", 
    TERMINADO: "TERMINADO", 
    NULO: "NULO",
  };
  
  export { Enum_Rol, Enum_EstadoUsuario, Enum_TipoObjetivo, Enum_EstadoProyecto, Enum_FaseProyecto };