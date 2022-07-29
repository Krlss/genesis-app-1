// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        users: payload.sort((a, b) => b.id - a.id),
      };
    case "ADD_USER":
      return {
        ...state,
        users: [payload, ...state.users],
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? payload : user
        ),
      };
    case "HANDLE_CHANGE":
      return {
        ...state,
        formData: { ...state.formData, ...payload },
      };
    case "RESET_DATA":
      return {
        ...state,
        formData: { cedula: "", nombre: "", apellido: "" },
      };
    case "MESSAGE":
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
};
