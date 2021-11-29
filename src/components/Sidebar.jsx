import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from 'context/authContext';
import "../styles/general.css";
// import Logito_completo from "./img/Logito_completo.png";
import blanco_60 from "./img/blanco_60.png";

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



const Dropdownuser = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    setToken(null);
  };
  return (
    <div className="w-56 flex justify-center top-16">
      <Menu as="div" className="relative inline-block text-right">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white color hover:bg-blue-300 rounded-md bg-opacity-10 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <i className="fas fa-user-cog"></i>
            <i
              className="fas fa-caret-down w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            ></i>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="w-56 mt-2 origin-top-right color bg-opacity-10 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    className={`${active ? "bg-green-700 text-white" : "text-white"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    to="perfil"
                  >
                    <div className='flex items-center'>
                        <i className='fas fa-user' />
                        <span className='text-sm  ml-2'>Perfil</span>
                      </div>
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  
                    <NavLink to='/login' className={`${active ? "bg-green-700 text-white" : "text-white"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`} onClick={() => deleteToken()}>
                      <div className='flex items-center'>
                        <i className='fas fa-sign-out-alt' />
                        <span className='text-sm  ml-2'>Cerrar Sesión</span>
                      </div>
                    </NavLink>
                  
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
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
        <Dropdownuser />
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
          <Dropdownuser />
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
