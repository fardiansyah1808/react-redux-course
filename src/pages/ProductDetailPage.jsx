import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { Heart, Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState({
    id: 0,
    productName: "",
    image: "",
    price: 0,
    stock: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(product.stock === 0 ? 0 : 1);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  const handleQuantityChange = (numValue) => {
    if (!isNaN(numValue)) {
      setQuantity(Math.min(Math.max(numValue, 0), product.stock));
    }
  };

  const addToCart = (quantity) => {
    alert(`Added ${quantity} ${product.productName} to cart`);
    setIsInCart(true);
  };

  const addToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  console.log("isLoading", isLoading);

  return (
    <main className="min-h-[90vh] max-w-screen-lg mx-auto px-4 my-8">
      <div className="grid grid-cols-2 gap-8">
        {isLoading ? (
          <Skeleton className="w-full h-128"></Skeleton>
        ) : (
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        )}
        <div className="flex flex-col gap-1 justify-center">
          {isLoading ? (
            <Skeleton className="w-[200px] h-8"></Skeleton>
          ) : (
            <h1 className="text-2xl font-bold">{product.productName}</h1>
          )}
          {isLoading ? (
            <Skeleton className="w-[300px] h-12"></Skeleton>
          ) : (
            <h3 className="font-bold text-3xl">
              Rp. {product.price.toLocaleString("id-ID")}
            </h3>
          )}
          {isLoading ? (
            <Skeleton className="w-[300px] h-64 mt-4"></Skeleton>
          ) : (
            <p className="text-md text-muted-foreground mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur eius aliquam voluptate recusandae praesentium repellat
              nisi deleniti, doloremque harum labore architecto impedit
              consequuntur numquam dolor esse sit hic alias omnis?
            </p>
          )}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-start items-center">
              {isLoading ? (
                <Skeleton className="w-1/4 h-8"></Skeleton>
              ) : (
                <div className="flex items-center gap-2 max-w-[30%]">
                  <Button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    variant="ghost"
                    size="icon"
                    disabled={!quantity || !product.stock}
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
                    disabled={quantity >= product.stock || !product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {isLoading ? (
                <Skeleton className="w-1/4 h-8 ml-4"></Skeleton>
              ) : (
                <p className="text-lg ml-4">
                  Stock: <span className="font-bold">{product.stock}</span>
                </p>
              )}
            </div>
            {isLoading ? (
              <div className="flex justify-center gap-4 mt-4">
                <Skeleton className="w-full h-8 gap-4 mt-4"></Skeleton>
                <Skeleton className="w-1/6 h-8 gap-4 mt-4"></Skeleton>
              </div>
            ) : (
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  onClick={() => addToCart(quantity)}
                  disabled={!product.stock || !quantity}
                  className="w-full"
                >
                  {!product.stock
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
