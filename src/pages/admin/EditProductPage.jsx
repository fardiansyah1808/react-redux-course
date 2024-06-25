import { ProductForm } from "@/components/forms/ProductForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { Progress } from "@/components/ui/progress";
import { axiosInstance } from "@/lib/axios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    image: "",
    price: 0,
    stock: 0,
  });

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${params.id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    const timer = setTimeout(() => setProgress(66), 1500);
    return () => clearTimeout(timer);
  }, [params.id]);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(13);
  const navigate = useNavigate();
  const handleEditProduct = (values) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await axiosInstance.patch(`/products/${params.id}`, {
          ...values,
        });
        if (response.status === 200) {
          alert("Product updated successfully");
          navigate("/admin/products");
        } else {
          alert("Failed to edit product");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <AdminLayout title="Edit Product" description="Edit your product">
      {product.id ? (
        <ProductForm
          onSubmit={handleEditProduct}
          isLoading={isLoading}
          titleForm={`Edit - ${product.productName}`}
          buttonText="Save Product"
          initialValues={product}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xl font-semibold">Loading...</p>
          <Progress value={progress} />
        </div>
      )}
    </AdminLayout>
  );
}
