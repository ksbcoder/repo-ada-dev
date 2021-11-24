import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/general.css";

import Logito_completo from "./img/Logito_completo.png"
import blanco_60 from "./img/blanco_60.png"

const SidebarLinks = () => {
  return (
    <ul className="mt-12">
      <SidebarRoute to="" title="Inicio" icon="fas fa-home" />
      <SidebarRoute to="/usuarios" title="Usuarios" icon="fas fa-user" />
      <SidebarRoute
        to="/proyectos"
        title="Proyectos"
        icon="fas fa-folder-open"
      />
      <SidebarRoute
        to="/inscripciones"
        title="Inscripciones"
        icon="fas fa-user-plus"
      />
      <SidebarRoute to="/avances" title="Avances" icon="fas fa-tasks" />
    </ul>
  );
};

const Logo = () => {
  return (
    <div className="py-3 w-full flex flex-col items-center justify-center">
      <img src={blanco_60} alt="Logo" className="h-16" />
      <span className="my-3 text-xl text-white font-bold text-center">
        AdaSoft Proyects
      </span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col md:flex-row flex-no-wrap md:h-full">
      {/* Sidebar starts */}

      <div className="sidebar hidden md:flex py-8">
        <Logo />
        <div className="px-2 pr-8">
          <SidebarLinks />
          
        </div>
      </div>
      
      <div className="flex md:hidden w-full justify-between bg-p-2 ">
        <i
          className={`fas fa-${open ? "times" : "bars"}`}
          onClick={() => setOpen(!open)}
        />
        <i className="fas fa-home" />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className="sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out"
        id="mobile-nav"
      >
        <div className="px-2 pr-8">
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "sidebar-route text-white bg-green-700"
            : "sidebar-route text-white hover:text-gray-800 hover:bg-blue-200"
        }
      >
        <div className="flex items-center">
          <i className={icon} />
          <span className="text-sm  ml-2">{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
