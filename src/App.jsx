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

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      {!location.pathname.startsWith("/admin" || "/auth") ? <Navbar /> : null}
      <div className="flex-grow">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/auth/login" Component={Login} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/wishlist" Component={WishlistPage} />
          <Route path="/carttt" element={<Navigate to="/cart" replace />} />
          <Route path="/product/:id" Component={ProductDetailPage} />
          <Route path="/admin">
            <Route path="products" Component={ProductManagementPage} />
            <Route path="products/create" Component={CreateProductPage} />
          </Route>
          <Route path="*" Component={Page404} />
        </Routes>
      </div>
      {!location.pathname.startsWith("/admin" || "/auth") ? <Footer /> : null}
    </div>
  );
}

export default App;
