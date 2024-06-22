import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const createProductFormSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  image: z.string().url({ message: "Invalid image URL" }),
  price: z.coerce
    .number()
    .min(1000, { message: "Price must be greater than 1000" }),
  stock: z.coerce.number().min(1, { message: "Stock must be greater than 0" }),
});

export default function CreateProductPage() {
  const form = useForm({
    defaultValues: {
      productName: "",
      image: "https://placehold.jp/396x594.png",
      price: 0,
      stock: 0,
    },
    resolver: zodResolver(createProductFormSchema),
    reValidateMode: "onSubmit",
  });

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
        form.reset();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        navigate("/admin/products");
      }
    }, 3000);
  };

  return (
    <AdminLayout title="Create Product" description="Add a new product">
      <Form {...form}>
        <form
          className="max-w-[600px] w-full mx-auto"
          onSubmit={form.handleSubmit(handleCreateProduct)}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Add a New Product</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {!form.formState.errors.productName && (
                      <FormDescription>
                        Product name must be at least 3 characters
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    {!form.formState.errors.productName && (
                      <FormDescription>
                        Product image URL must be a valid URL
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    {!form.formState.errors.productName && (
                      <FormDescription>
                        Price must be greater than 1000
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    {!form.formState.errors.productName && (
                      <FormDescription>
                        Stock must be greater than 0
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </AdminLayout>
  );
}
