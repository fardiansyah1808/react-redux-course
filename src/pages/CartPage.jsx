import { CartItem } from "@/components/CartItem";
import ProtectedPage from "@/components/guard/ProtectedPage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/axios";
import { fetchCarts } from "@/lib/fetchCart";
import { formatRupiah } from "@/lib/formatRupiah";
import { useSelector } from "react-redux";

function CartPage() {
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.user);
  const sumCart = cartSelector.carts.reduce(
    (sum, cart) => sum + cart.product.price * cart.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      for (let i = 0; i < cartSelector.carts.length; i++) {
        const cart = cartSelector.carts[i];
        if (cart.product.stock < cart.quantity) {
          return alert(`One of the product stock is not enough`);
        }
      }

      await axiosInstance.post("/transactions", {
        userId: userSelector.id,
        tax: sumCart * 0.11,
        totalPrice: sumCart + sumCart * 0.11,
        trxDate: new Date(),
        items: cartSelector.carts,
      });

      for (const cart of cartSelector.carts) {
        try {
          await axiosInstance.patch(`/products/${cart.productId}`, {
            stock: cart.product.stock - cart.quantity,
          });
        } catch (error) {
          console.error(`Failed to update product ${cart.productId}:`, error);
        }
      }

      for (const cart of cartSelector.carts) {
        try {
          await axiosInstance.delete(`/carts/${cart.id}`);
        } catch (error) {
          console.error(`Failed to delete cart ${cart.id}:`, error);
        }
      }

      fetchCarts(userSelector.id);

      alert("Checkout successful");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProtectedPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="mt-10">
          <Separator />
          {cartSelector.carts.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-lg text-muted-foreground">Cart is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-8 my-8">
              <div className="col-span-7 gap-6 flex flex-col">
                {cartSelector.carts.map((cart) => (
                  <CartItem
                    key={cart.id}
                    productName={cart.product.productName}
                    image={cart.product.image}
                    price={cart.product.price}
                    quantity={cart.quantity}
                    stock={cart.product.stock}
                    cartId={cart.id}
                  />
                ))}
              </div>
              <Card className="col-span-5">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex py-4 justify-between border-b border-gray-200">
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="text-sm font-medium">
                      {formatRupiah(sumCart)}
                    </p>
                  </div>
                  <div className="flex py-4 justify-between border-b border-gray-200">
                    <p className="text-sm text-muted-foreground">Taxes (11%)</p>
                    <p className="text-sm font-medium">
                      {formatRupiah(sumCart * 0.11)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex-col flex gap-4">
                  <div className="flex justify-between w-full">
                    <p className="font-semibold text-muted-foreground">Total</p>
                    <p className="font-semibold text-lg">
                      {formatRupiah(sumCart + sumCart * 0.11)}
                    </p>
                  </div>
                  <Button
                    disabled={cartSelector.carts.length === 0}
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </ProtectedPage>
  );
}

export default CartPage;
