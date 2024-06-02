import { Heart, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

export default function Navbar() {
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
              <ShoppingCart className=" h-4 w-4" />
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
          <Link to="/login">
            <Button size="sm">Log in</Button>
          </Link>
          <Button size="sm" variant="outline">
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
}
