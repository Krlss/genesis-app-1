import { useReducer, useEffect } from "react";
import axios from "axios";
import UserReducer from "./UserReducer";
import AuthContext from "./UserContext";
import { useRouter } from "next/dist/client/router";

const initialState = {
  users: [],
  formData: {
    cedula: "",
    nombre: "",
    apellido: "",
  },
  message: "",
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const router = useRouter();

  const resetData = () => {
    dispatch({ type: "RESET_DATA" });
    router.replace("/");
  };

  const getUsers = async () => {
    const result = await axios.get("/api/clients");
    dispatch({ type: "GET_USERS", payload: result.data });
  };

  const addUser = async (user) => {
    const result = await axios.post("/api/clients", user);
    dispatch({ type: "ADD_USER", payload: result.data });
    sedMessage("Usuario agregado correctamente");
    resetData();
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/clients/${id}`);
    dispatch({ type: "DELETE_USER", payload: id });
    sedMessage("Usuario eliminado");
    resetData();
  };

  const updateUser = async (user) => {
    const result = await axios.put(`/api/clients/${user.id}`, user);
    dispatch({ type: "UPDATE_USER", payload: user });
    sedMessage("Usuario actualizado");
    resetData();
  };

  const handleChange = (client) => {
    dispatch({ type: "HANDLE_CHANGE", payload: client });
  };

  const sedMessage = (message) => {
    dispatch({ type: "MESSAGE", payload: message });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (state.message) {
      setTimeout(() => {
        dispatch({ type: "MESSAGE", payload: "" });
      }, 3000);
    }
  }, [state.message]);

  return (
    <AuthContext.Provider
      value={{
        users: state.users,
        formData: state.formData,
        message: state.message,
        getUsers,
        addUser,
        deleteUser,
        updateUser,
        handleChange,
        resetData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;
