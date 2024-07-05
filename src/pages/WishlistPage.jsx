import ProtectedPage from "@/components/guard/ProtectedPage";

function WishlistPage() {
  return (
    <ProtectedPage>
      <p className="flex justify-center items-center h-screen text-5xl font-extrabold">
        Wishlist Page
      </p>
    </ProtectedPage>
  );
}

export default WishlistPage;
