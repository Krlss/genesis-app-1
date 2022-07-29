import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/UserContext";

const Form = (props) => {
  const { addUser, updateUser, handleChange, formData, resetData, message } =
    useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query?.id) {
        updateUser({
          ...formData,
        });
      } else {
        addUser({
          ...formData,
        });
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const disabled = !formData.apellido || !formData.cedula || !formData.nombre;

  return (
    <form className="flex flex-col gap-2">
      {message && (
        <p className="text-center px-4 py-2 font-semibold bg-blue-400 text-white">
          {message}
        </p>
      )}
      <div className="bg-pink-400 p-2 rounded-md text-center font-bold">
        {router.query?.id ? "Editar usuario" : "Agregar usuario"}
      </div>
      <input
        type="text"
        className="bg-slate-50 border px-4 py-2 focus:outline-none"
        placeholder="Cedula"
        name="cedula"
        value={formData.cedula}
        onChange={(e) => handleChange({ cedula: e.target.value })}
      />
      <input
        type="text"
        className="bg-slate-50 border px-4 py-2 focus:outline-none"
        placeholder="Nombres"
        name="nombre"
        value={formData.nombre}
        onChange={(e) => handleChange({ nombre: e.target.value })}
      />
      <input
        type="text"
        className="bg-slate-50 border px-4 py-2 focus:outline-none"
        placeholder="Apellidos"
        name="apellido"
        value={formData.apellido}
        onChange={(e) => handleChange({ apellido: e.target.value })}
      />
      <button
        onClick={handleSubmit}
        className={`bg-yellow-300 p-2 rounded-md font-semibold ${
          disabled ? "opacity-50 cursor-not-allowed " : "cursor-pointer "
        }`}
        disabled={disabled}
      >
        Enviar
      </button>
      <button
        className={`bg-blue-300 p-2 rounded-md font-semibold ${
          disabled ? "opacity-50 cursor-not-allowed " : "cursor-pointer "
        }`}
        disabled={disabled}
        onClick={resetData}
      >
        Cancelar
      </button>
    </form>
  );
};

export default Form;
