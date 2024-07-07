import { formatRupiah } from "@/lib/formatRupiah";
import { Button } from "./ui/button";
import { Check, MinusIcon, Plus, Trash, X } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";
import { fetchCarts } from "@/lib/fetchCart";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";

export const CartItem = (props) => {
  const { productName, image, quantity, price, stock, cartId } = props;
  const isAvailable = stock >= quantity;
  const userSelector = useSelector((state) => state.user);
  const [newQuantity, setNewQuantity] = useState(quantity);

  const debounceUpdateCartQuantity = useDebouncedCallback(() => {
    updateCartQuantity();
  }, 1200);

  const handleQuantityChange = (numValue) => {
    if (!isNaN(numValue)) {
      setNewQuantity(Math.min(Math.max(numValue, 0), stock));
    }
  };

  const handleRemove = async () => {
    try {
      const isConfirmed = confirm("Are you sure you want to remove this item?");
      if (isConfirmed) {
        await axiosInstance.delete(`/carts/${cartId}`);
        fetchCarts(userSelector.id);
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartQuantity = async () => {
    try {
      await axiosInstance.patch(`/carts/${cartId}`, { quantity: newQuantity });
      fetchCarts(userSelector.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    debounceUpdateCartQuantity();
  }, [newQuantity]);

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     updateCartQuantity();
  //   }, 1200);
  //   return () => clearTimeout(delayDebounce);
  // }, [newQuantity]);

  return (
    <div className="flex gap-4 ">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
        <img src={image} alt={productName} className="w-full" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <p className="text-lg">{productName}</p>
          <p className="text-sm text-muted-foreground">{`stock : ${stock}`}</p>
          <p className="text-2xl font-bold">{formatRupiah(price)}</p>
        </div>
        <div className="flex items-center gap-2">
          {newQuantity < 2 ? (
            <Button variant="ghost" size="icon" onClick={handleRemove}>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(newQuantity - 1)}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
          )}
          <Input
            type="text"
            value={newQuantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="text-lg font-bold border-none text-center max-w-12"
          />
          <Button
            variant="ghost"
            size="icon"
            disabled={newQuantity >= stock}
            onClick={() => handleQuantityChange(newQuantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-between w-full">
          {isAvailable ? (
            <>
              <div className="flex gap-2 items-center">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <Button
                className="text-destructive"
                variant="link"
                onClick={handleRemove}
              >
                Remove items
              </Button>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center">
                <X className="w-4 h-4 text-red-500" />
                <span className="text-sm text-muted-foreground">
                  Not Available
                </span>
              </div>
              <Button
                className="text-destructive"
                variant="link"
                onClick={handleRemove}
              >
                Remove items
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
