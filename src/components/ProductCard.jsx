import { Heart, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
// import { useEffect } from "react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";
import { fetchCarts } from "@/lib/fetchCart";

export default function ProductCard({ image, productName, price, stock, id }) {
  // const { image, productName, price, stock } = props;
  const [quantity, setQuantity] = useState(stock === 0 ? 0 : 1);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const userSelected = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  const handleQuantityChange = (numValue) => {
    if (!isNaN(numValue)) {
      setQuantity(Math.min(Math.max(numValue, 0), stock));
    }
  };

  // const fetchCarts = async () => {
  //   try {
  //     const cartResponse = await axiosInstance.get("/carts", {
  //       params: {
  //         userId: userSelected.id,
  //         _expand: "product",
  //       },
  //     });
  //     dispatch({ type: "GET_CARTS", payload: cartResponse.data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const addToCart = async () => {
    if (!userSelected.id) {
      return alert("Please login to add to cart");
    }
    try {
      const cartResponse = await axiosInstance.get("/carts", {
        params: {
          userId: userSelected.id,
          _expand: "product",
        },
      });
      const existingCart = cartResponse.data.find((cart) => {
        return cart.productId === id;
      });
      if (!existingCart) {
        await axiosInstance.post("/carts", {
          userId: userSelected.id,
          productId: id,
          quantity,
        });
      } else {
        if (existingCart.quantity + quantity > existingCart.product.stock) {
          return alert("Stock is not enough");
        }
        await axiosInstance.patch(`/carts/${existingCart.id}`, {
          quantity: existingCart.quantity + quantity,
        });
      }

      alert(`${quantity} ${productName} added to cart`);
      fetchCarts(userSelected.id);
      setIsInCart(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  //While Mount
  // useEffect(() => {
  //   alert("Component mounted");
  // }, []);

  //While Update/Mount
  // useEffect(() => {
  //   alert("Component updated");
  // }, [quantity]);

  //While Unmount
  // useEffect(() => {
  //   return () => {
  //     alert("Component unmounted");
  //   };
  // }, []);

  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <Link to={`/product/${id}`}>
        <div className="aspect-square bg-neutral-200 w-full overflow-hidden rounded-sm">
          <img src={image} alt={productName} />
        </div>
      </Link>
      <Link to={`/product/${id}`}>
        <div className="flex flex-col gap-2 max-w-96 mt-4">
          <h2 className="text-md truncate">{productName}</h2>
          <p className="font-bold text-xl">
            Rp. {price.toLocaleString("id-ID")}
          </p>
          <p className="text-muted-foreground text-sm">In stock: {stock}</p>
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={() => handleQuantityChange(quantity - 1)}
            variant="ghost"
            size="icon"
            disabled={!quantity || !stock}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="text"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="text-lg font-bold border-none text-center"
          />
          <Button
            onClick={() => handleQuantityChange(quantity + 1)}
            variant="ghost"
            size="icon"
            disabled={quantity >= stock || !stock}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => addToCart(quantity)}
            disabled={!stock || !quantity}
            className="w-full"
          >
            {!stock
              ? "Out of stock"
              : !quantity
              ? "Add a Quantity"
              : isInCart
              ? "Add More to Cart"
              : "Add to Cart"}
          </Button>
          <Button
            onClick={addToWishlist}
            variant="ghost"
            size="icon"
            className="w-1/12"
          >
            <Heart
              className="w-8 h-8"
              fill={isInWishlist ? "red" : "none"}
              stroke={isInWishlist ? "red" : "black"}
              strokeWidth={1}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
