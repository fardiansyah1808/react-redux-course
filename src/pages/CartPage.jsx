import ProtectedPage from "@/components/guard/ProtectedPage";

function CartPage() {
  return (
    <ProtectedPage>
      <p className="flex justify-center items-center h-screen text-5xl font-extrabold">
        CartPage
      </p>
    </ProtectedPage>
  );
}

export default CartPage;
