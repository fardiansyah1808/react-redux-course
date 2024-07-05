const initialState = {
  id: "",
  email: "",
  username: "",
  image:
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
  fullName: "",
  role: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
