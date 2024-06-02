import { axiosInstance } from "@/lib/axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

// const products = productsRaw.map((product) => {
//   console.log("products", productsRaw);
//   return <ProductCard key={product.id} {...product} />;
// });

export default function Main() {
  const [productsRaw, setProductsRaw] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      if (response.status === 200) {
        setProductsRaw(response.data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const products = productsRaw.map((product) => {
    return <ProductCard key={product.id} {...product} />;
  });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products}
      </div>
    </>
  );
}
