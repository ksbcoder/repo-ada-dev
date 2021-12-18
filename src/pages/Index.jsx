import React from "react";
import PrivateComponent from "components/PrivateComponent";
import { useUser } from "context/userContext";
import estudiantes from "components/img/student-g273295332_640.jpg";
import datos from "components/img/office-gb48396a24_640.jpg";
import avance from "components/img/student-g318b6e4dd_640.jpg";
import gestion from "components/img/programming-g60aff1f8a_640.jpg";
import "styles/Homestyle.css";
const Index = () => {
  const { userData } = useUser();

  return (
    <>
      <div className="navbar">
        <span className="flex flex-col justify-center text-center">
          ¡Bienvenido!
          <br />
          {userData.nombre + " " + userData.apellido}
        </span>
      </div>
      <div className="container containerC">
        <PrivateComponent roleList={["ESTUDIANTE"]}>
          <div className="row d-flex justify-content-evenly mx-auto text-center">
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={estudiantes} class="card-img-top" alt="Proyectos" />
              <div class="card-body">
                <p class="card-text">
                  Prueba inscribirte a un proyecto desde la opción "Proyectos"
                  del menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={avance} class="card-img-top" alt="Avances" />
              <div class="card-body">
                <p class="card-text">
                  Puedes escribir un nuevo avance de tu proyecto en la opción
                  "Avances" del menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={datos} class="card-img-top" alt="Datos" />
              <div class="card-body">
                <p class="card-text">
                  Puedes actualizar tus datos personales y tu contraseña desde
                  la opción "Perfil" del menú
                </p>
              </div>
            </div>
          </div>
        </PrivateComponent>
        <PrivateComponent roleList={["ADMINISTRADOR"]}>
          <div className="row d-flex justify-content-evenly mx-auto text-center">
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={gestion} class="card-img-top" alt="Gestion" />
              <div class="card-body">
                <p class="card-text">
                  Como administrador puedes gestionar los usuarios desde la
                  opción de "Usuarios" en el menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={estudiantes} class="card-img-top" alt="Proyectos" />
              <div class="card-body">
                <p class="card-text">
                  Puedes listar todos los proyectos y gestionarlos desde la
                  opción "Proyectos" del menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={avance} class="card-img-top" alt="Avances" />
              <div class="card-body">
                <p class="card-text">
                  Puedes listar todos los avances en la opción "Avances" del
                  menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={datos} class="card-img-top" alt="Datos" />
              <div class="card-body">
                <p class="card-text">
                  Puedes actualizar tus datos personales y tu contraseña desde
                  la opción "Perfil" del menú
                </p>
              </div>
            </div>
          </div>
        </PrivateComponent>
        <PrivateComponent roleList={["LIDER"]}>
          <div className="row d-flex justify-content-evenly mx-auto text-center">
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={gestion} class="card-img-top" alt="Gestion" />
              <div class="card-body">
                <p class="card-text">
                  Como lider puedes gestionar los estudiantes desde la opción de
                  "Usuarios" en el menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={estudiantes} class="card-img-top" alt="Proyectos" />
              <div class="card-body">
                <p class="card-text">
                  Puedes crear y listar todos los proyectos que lideras y
                  gestionarlos desde la opción "Proyectos" del menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={avance} class="card-img-top" alt="Avances" />
              <div class="card-body">
                <p class="card-text">
                  Puedes listar y hacer observaciones a los avances desde la
                  opción "Avances" del menú
                </p>
              </div>
            </div>
            <div
              class="card col-md-12 col-sm-12 col-xs-12 mt-2"
              style={{ width: "18rem" }}
            >
              <img src={datos} class="card-img-top" alt="Datos" />
              <div class="card-body">
                <p class="card-text">
                  Puedes actualizar tus datos personales y tu contraseña desde
                  la opción "Perfil" del menú
                </p>
              </div>
            </div>
          </div>
        </PrivateComponent>
      </div>
    </>
  );
};

export default Index;
