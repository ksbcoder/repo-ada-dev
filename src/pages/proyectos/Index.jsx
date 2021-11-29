import React from "react";
import { Link } from "react-router-dom";
import {InfoProyectos} from "./InfoProyectos"

const IndexProyectos = () => {
  return (
    <div>
      
      <h1 className='bg-light-brown text-hard-green text-center '> Poryectos </h1>
      <br/>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Full name</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Regular input" id="forms-labelOverInputCode"/>
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Full name</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Regular input" id="forms-labelOverInputCode"/>
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Full name</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Regular input" id="forms-labelOverInputCode"/>
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Full name</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Regular input" id="forms-labelOverInputCode"/>
      </div>
      <div class="text-gray-700">
        <label class="block mb-1" for="forms-labelOverInputCode">Full name</label>
        <input class="w-full h-10 px-3 text-base bg-light-brown placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Regular input" id="forms-labelOverInputCode"/>
      </div>
      <Link to="InfoProyectos" className="btn-general">
          Registrar Avance
        </Link>
  
    </div>
  );
};

export default IndexProyectos;
