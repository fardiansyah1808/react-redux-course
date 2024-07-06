import { axiosInstance } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch();
  const hydrateUser = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");
      if (!currentUser) {
        return;
      }
      const userResponse = await axiosInstance.get(`/users/${currentUser}`);

      dispatch({ type: "LOGIN", payload: userResponse.data });
    } catch (error) {
      console.error("Error hydrating user:", error);
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  return { isHydrated };
};
