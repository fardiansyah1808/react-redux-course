import { Heart, History, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { Badge } from "./ui/badge";
import { fetchCarts } from "@/lib/fetchCart";

export default function Navbar() {
  const userSelector = useSelector((state) => state.user);
  const cartSelector = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("current-user");
  };

  // const fetchCarts = async () => {
  //   try {
  //     const cartResponse = await axiosInstance.get("/carts", {
  //       params: {
  //         userId: userSelector.id,
  //         _expand: "product",
  //       },
  //     });
  //     dispatch({ type: "GET_CARTS", payload: cartResponse.data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchCarts(userSelector.id);
  }, []);

  return (
    <nav className="border-b-2 border-gray-200 py-4 flex justify-between items-center px-8">
      {/* Logo */}
      <Link to="/">
        <div className="flex flex-col items-center hover:cursor-pointer">
          <p className="text-2xl font-medium ">V A R D I V</p>
          <p className="font-light text-sm">Re-rendering your Looks</p>
        </div>
      </Link>
      {/* Search bar */}
      <Input
        placeholder="Search products..."
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      />
      {/* Button */}
      <div className="flex space-x-4 justify-between items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button size="icon" variant="ghost">
              {cartSelector.carts.length > 0 ? (
                <div className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-4 -right-4 p-0 m-0 rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartSelector.carts.length}
                  </Badge>
                </div>
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </Button>
          </Link>
          <Link to="/history">
            <Button size="icon" variant="ghost">
              <History className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button size="icon" variant="ghost">
              <Heart className=" h-4 w-4" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-auto" />
        </div>
        <div className="flex flex-wrap space-x-2 justify-center items-center">
          {userSelector.id ? (
            <>
              <p>
                {userSelector.username}({userSelector.role})
              </p>
              <Button size="sm" variant="destructive" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button size="sm">Log in</Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm" variant="outline">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
