import { globalStore } from "@/store/store";
import { axiosInstance } from "./axios";

export const fetchCarts = async (userId) => {
  try {
    const cartResponse = await axiosInstance.get("/carts", {
      params: {
        userId: userId,
        _expand: "product",
      },
    });
    globalStore.dispatch({ type: "GET_CARTS", payload: cartResponse.data });
  } catch (error) {
    console.error(error);
  }
};
