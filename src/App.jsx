import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WishlistPage from "./pages/WishlistPage";
import Page404 from "./pages/Page404";
import Login from "./pages/auth/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import Counter from "./pages/Counter";
import RegisterPage from "./pages/auth/RegisterPage";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./lib/axios";
import { useEffect, useState } from "react";
import { Spinner } from "./components/ui/spinner";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isHydrated, setIsHydrated] = useState(false);
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

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!location.pathname.startsWith("/auth") ? <Navbar /> : null}
      <div className="flex-grow">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/auth/login" Component={Login} />
          <Route path="/auth/register" Component={RegisterPage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/wishlist" Component={WishlistPage} />
          <Route path="/carttt" element={<Navigate to="/cart" replace />} />
          <Route path="/counter" Component={Counter} />
          <Route path="/product/:id" Component={ProductDetailPage} />
          <Route path="/admin">
            <Route path="products" Component={ProductManagementPage} />
            <Route path="products/create" Component={CreateProductPage} />
            <Route path="products/:id/edit" Component={EditProductPage} />
          </Route>
          <Route path="*" Component={Page404} />
        </Routes>
      </div>
      {!location.pathname.startsWith("/auth") ? <Footer /> : null}
    </div>
  );
}

export default App;
