import productsRaw from "@/lib/data/productsData";
import ProductCard from "./ProductCard";
import Header from "./Header";

export default function Main() {
  const products = productsRaw.map((product) => {
    return <ProductCard key={product.id} {...product} />;
  });

  return (
    <main className="min-h-[90vh] max-w-screen-xl mx-auto px-4 my-8 flex flex-col justify-center items-center">
      <Header />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products}
      </div>
    </main>
  );
}
