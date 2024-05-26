import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WishlistPage from "./pages/WishlistPage";
import Page404 from "./pages/Page404";
import Login from "./pages/auth/LoginPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={Login} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/wishlist" Component={WishlistPage} />
          <Route path="/carttt" element={<Navigate to="/cart" replace />} />
          <Route path="*" Component={Page404} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
