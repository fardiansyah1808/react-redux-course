import AdminLayout from "@/components/layout/AdminLayout";
import { v4 as uuidv4 } from "uuid";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/forms/ProductForm";

export default function CreateProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateProduct = async (values) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await axiosInstance.post("/products", {
          id: uuidv4(),
          ...values,
        });
        alert("Product created successfully");
        // form.reset();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        navigate("/admin/products");
      }
    }, 2000);
  };

  return (
    <AdminLayout title="Create Product" description="Add a new product">
      <ProductForm
        onSubmit={handleCreateProduct}
        isLoading={isLoading}
        titleForm="Add a New Product"
        buttonText="Create Product"
        initialValues={{
          productName: "",
          image: "https://placehold.jp/396x594.png",
          price: 0,
          stock: 0,
        }}
      />
    </AdminLayout>
  );
}
