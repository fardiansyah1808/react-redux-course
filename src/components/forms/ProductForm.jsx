import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productFormSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  image: z.string().url({ message: "Invalid image URL" }),
  price: z.coerce
    .number()
    .min(1000, { message: "Price must be greater than 1000" }),
  stock: z.coerce.number().min(0, { message: "Stock must be greater than 0" }),
});

export const ProductForm = (props) => {
  const { onSubmit, isLoading, titleForm, buttonText, initialValues } = props;
  const { productName, image, price, stock } = initialValues;
  const form = useForm({
    defaultValues: {
      productName: productName ?? "",
      image: image ?? "https://placehold.jp/396x594.png",
      price: price ?? 0,
      stock: stock ?? 0,
    },
    resolver: zodResolver(productFormSchema),
    reValidateMode: "onSubmit",
  });
  return (
    <Form {...form}>
      <form
        className="max-w-[600px] w-full mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">{titleForm}</CardTitle>
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
                  {!form.formState.errors.image && (
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
                  {!form.formState.errors.price && (
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
                  {!form.formState.errors.stock && (
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
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Loading..." : buttonText}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
