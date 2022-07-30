import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useRouter } from "next/router";

const Table = (props) => {
  const { users, handleChange, deleteUser } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleChange_ = (e) => {
    const { value } = e.target;
    setFilteredUsers(
      users.filter(
        (user) =>
          user.nombre.toLowerCase().includes(value.toLowerCase()) ||
          user.apellido.toLowerCase().includes(value.toLowerCase()) ||
          user.cedula.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
      <div className="bg-pink-400 p-2 rounded-md text-center font-bold">
        Lista de usuarios
      </div>
      <input
        type="text"
        className="bg-slate-100 border px-4 py-2 focus:outline-none"
        name="cedula"
        placeholder="Buscar"
        onChange={handleChange_}
      />
      <table className="bg-slate-50 border border-white ">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Cedula</th>
            <th className="px-4 py-2 border">Nombres</th>
            <th className="px-4 py-2 border">Apellidos</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((client) => (
            <tr key={client.id}>
              <td className="px-4 py-2 border">{client.cedula}</td>
              <td className="px-4 py-2 border">{client.nombre}</td>
              <td className="px-4 py-2 border">{client.apellido}</td>
              <td className="flex px-4 py-2 gap-2 border justify-center">
                <button
                  className="bg-yellow-300 p-1 rounded-md font-semibold"
                  onClick={() => {
                    handleChange(client);
                    router.push("?id=" + client.id);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-300 p-1 rounded-md font-semibold"
                  onClick={() => deleteUser(client.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
