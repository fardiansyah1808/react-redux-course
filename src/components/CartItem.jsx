import { formatRupiah } from "@/lib/formatRupiah";
import { Button } from "./ui/button";
import { Check, MinusIcon, Plus, Trash, X } from "lucide-react";

export const CartItem = (props) => {
  const { productName, image, quantity, price } = props;
  const isAvailable = false;
  return (
    <div className="flex gap-4 ">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
        <img src={image} alt={productName} className="w-full" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <p>{productName}</p>
          <p>{formatRupiah(price)}</p>
        </div>
        <div className="flex items-center gap-2">
          {quantity < 2 ? (
            <Button variant="ghost" size="icon">
              <Trash className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <MinusIcon className="w-4 h-4" />
            </Button>
          )}
          <p className="text-lg font-bold">{quantity}</p>
          <Button variant="ghost" size="icon">
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
              <Button className="text-destructive" variant="link">
                Remove items
              </Button>
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-sm text-muted-foreground">
                Not Available
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
