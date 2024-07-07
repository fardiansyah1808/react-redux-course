const initialState = {
  carts: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CARTS":
      return {
        ...state,
        carts: action.payload,
      };
    default:
      return state;
  }
};
