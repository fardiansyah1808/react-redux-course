import { Heart, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
// import { useEffect } from "react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

export default function ProductCard({ image, productName, price, stock, id }) {
  // const { image, productName, price, stock } = props;
  const [quantity, setQuantity] = useState(stock === 0 ? 0 : 1);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleQuantityChange = (numValue) => {
    if (!isNaN(numValue)) {
      setQuantity(Math.min(Math.max(numValue, 0), stock));
    }
  };

  const addToCart = (quantity) => {
    alert(`Added ${quantity} ${productName} to cart`);
    setIsInCart(true);
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
