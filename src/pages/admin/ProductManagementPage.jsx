import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
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
import { ChevronLeft, ChevronRight, Ellipsis, Plus } from "lucide-react";
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
    first: 0,
    items: 0,
    last: 0,
    next: 0,
    pages: 0,
    prev: 0,
  });

  const [searchProductName, setSearchProductName] = useState("");

  const [loading, setLoading] = useState(false);

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

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          productName: searchParams.get("productName"),
        },
      });
      const { data } = response;
      // console.log("data", data);
      setProducts(data.data);
      setPagination(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
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
      <div className="mb-4">
        <form className="flex gap-2 justify-end" onSubmit={handleSearch}>
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
      <Table className="p-4 border rounded-md shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{rupiah(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Ellipsis className="w-4 h-4 mr-2" />
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
      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousPage}
              disabled={
                Number(searchParams.get("page")) === pagination.first || loading
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
                Number(searchParams.get("page")) === pagination.last || loading
              }
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
}
