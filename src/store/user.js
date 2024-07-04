const initialState = {
  id: 1,
  username: "fardi",
  email: "fardi@gmail.com",
  role: "admin",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
