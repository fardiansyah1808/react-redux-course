import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { ChevronLeft, ChevronRight, Edit3, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export default function ProductManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    first: 1,
    items: 0,
    last: 0,
    next: 0,
    pages: 1,
    prev: 0,
  });

  const [searchProductName, setSearchProductName] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleNextPage = () => {
    searchParams.set("page", pagination.next);
    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", pagination.prev);
    setSearchParams(searchParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchProductName) {
      searchParams.set("productName", searchProductName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("productName");
      setSearchParams(searchParams);
    }
  };

  // const handleCheckedAllProducts = (checked) => {
  //   if (checked) {
  //     if (selectedProducts.length === 0) {
  //       setSelectedProducts(products.map((product) => product.id));
  //     } else {
  //       const newSelectedProducts = products
  //         .map((product) => product.id)
  //         .filter((id) => !selectedProducts.includes(id));

  //       setSelectedProducts([...selectedProducts, ...newSelectedProducts]);
  //     }
  //   } else {
  //     const newSelectedProducts = selectedProducts.filter(
  //       (id) => !products.some((product) => product.id === id)
  //     );

  //     setSelectedProducts(newSelectedProducts);
  //   }
  // };

  const handleCheckedAllProducts = (checked) => {
    if (checked) {
      const newSelectedProducts = products
        .map((product) => product.id)
        .filter((id) => !selectedProducts.includes(id));
      setSelectedProducts([...selectedProducts, ...newSelectedProducts]);
    } else {
      const newSelectedProducts = selectedProducts.filter(
        (id) => !products.some((product) => product.id === id)
      );
      setSelectedProducts(newSelectedProducts);
    }
  };

  const isAllProductsChecked =
    products.length > 0 &&
    products.every((product) => selectedProducts.includes(product.id));

  const handleCheckedProduct = (id, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(selectedProducts.filter((product) => product !== id));
    }
  };

  const fetchProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/products", {
          params: {
            _limit: 5,
            _page: Number(searchParams.get("page")),
            productName: searchParams.get("productName"),
          },
        });
        console.log(response, "response");

        setProducts(response.data);

        const totalItems = parseInt(response.headers["x-total-count"]);
        const totalPages = Math.ceil(totalItems / 5);

        setPagination({
          first: 1,
          items: totalItems,
          last: totalPages,
          next: page < totalPages ? page + 1 : totalPages,
          pages: page,
          prev: page > 1 ? page - 1 : 1,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [searchParams]
  );

  console.log(pagination, "next");

  const handleDeleteProduct = async (id) => {
    const deleteProduct = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!deleteProduct) return;
    try {
      if (products.length === 1 && Number(searchParams.get("page")) > 1) {
        searchParams.set("page", Number(searchParams.get("page")) - 1);
        setSearchParams(searchParams);
      }
      await axiosInstance.delete(`/products/${id}`);
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    } finally {
      await fetchProducts();
    }
  };

  const handleDeleteSelected = async () => {
    const deleteProduct = confirm(
      `Are you sure you want to delete ${selectedProducts.length} products?`
    );
    if (!deleteProduct) return;

    const deletePromises = selectedProducts.map((id) =>
      axiosInstance.delete(`/products/${id}`)
    );
    try {
      await Promise.all(deletePromises);
      alert(`${selectedProducts.length} products deleted successfully`);
    } catch (error) {
      console.error(error);
      alert(`Failed to delete ${selectedProducts.length} products`);
    } finally {
      await fetchProducts();
      setSelectedProducts([]);
      searchParams.set("page", pagination.first);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.pages);
  }, [fetchProducts]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <AdminLayout
      title="Product Management"
      description="Manage your products and categories"
      rightSection={
        <Link to="/admin/products/create">
          <Button variant="default" size="sm">
            <Plus className="w-6 h-6 mr-2" />
            Add product
          </Button>
        </Link>
      }
    >
      {selectedProducts.length > 0 ? (
        <div className="flex gap-4 justify-between mb-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
          >
            Delete {selectedProducts.length} Products
          </Button>
          <form
            className="flex gap-2 justify-end w-full"
            onSubmit={handleSearch}
          >
            <Input
              placeholder="Search for products..."
              className="max-w-[400px] lg:max-w-[600px] md:max-w-[300px] sm:max-w-full"
              onChange={(e) => setSearchProductName(e.target.value)}
              name="productName"
            />
            <Button variant="default" size="sm" type="submit">
              Search
            </Button>
          </form>
        </div>
      ) : (
        <form className="flex gap-2 justify-end mb-4" onSubmit={handleSearch}>
          <Input
            placeholder="Search for products..."
            className="max-w-[400px] lg:max-w-[600px] md:max-w-[300px] sm:max-w-full"
            onChange={(e) => setSearchProductName(e.target.value)}
            name="productName"
          />
          <Button variant="default" size="sm" type="submit">
            Search
          </Button>
        </form>
      )}

      <Table className="p-4 border rounded-md shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                onCheckedChange={handleCheckedAllProducts}
                checked={isAllProductsChecked}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    onCheckedChange={(checked) =>
                      handleCheckedProduct(product.id, checked)
                    }
                    checked={selectedProducts.includes(product.id)}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{rupiah(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="flex gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/admin/products/${product.id}/edit`}>
                      <Edit3 className="w-4 h-4 text-blue-500" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">Loading products...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center">
        <p className="mt-2 text-sm text-nowrap mx-auto w-full text-center">
          Showing {products.length} products out of {pagination.items} products
        </p>
        <Pagination className="mt-2">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousPage}
                disabled={
                  Number(searchParams.get("page")) === pagination.first ||
                  loading
                }
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem className="mx-8 font-semibold text-sm">
              Page {searchParams.get("page")}
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextPage}
                disabled={
                  Number(searchParams.get("page")) === pagination.last ||
                  loading
                }
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AdminLayout>
  );
}
