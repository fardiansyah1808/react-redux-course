import { CartItem } from "@/components/CartItem";
import ProtectedPage from "@/components/guard/ProtectedPage";
import { Separator } from "@/components/ui/separator";

function CartPage() {
  return (
    <ProtectedPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="mt-10">
          <Separator />
          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              <CartItem
                productName="Product 1"
                image="https://via.placeholder.com/150"
                price={10000}
                quantity={2}
              />
            </div>
          </div>
        </div>
      </main>
    </ProtectedPage>
  );
}

export default CartPage;
