import { axiosInstance } from "@/lib/axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { useSelector } from "react-redux";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [productsRaw, setProductsRaw] = useState([]);
  const [progress, setProgress] = useState(12);

  const userSelector = useSelector((state) => state.user);
  const counterSelector = useSelector((state) => state.counter);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/products");
      if (response.status === 200) {
        setProductsRaw(response.data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //fetch data
    fetchProducts();
    //set progress
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const products = productsRaw.map((product) => {
    return <ProductCard key={product.id} {...product} />;
  });

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen w-[60%] gap-2">
          <p>Loading...</p>
          <Progress value={progress} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <p>{userSelector.username}</p>
            <p>{counterSelector}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {products}
          </div>
        </>
      )}
    </>
  );
}
