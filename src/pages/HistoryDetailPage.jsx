import ProtectedPage from "@/components/guard/ProtectedPage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { formatRupiah } from "@/lib/formatRupiah";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";

export const HistoryDetailPage = () => {
  const userSelector = useSelector((state) => state.user);
  const params = useParams();
  const initialHistoryDetail = {
    id: 1,
    userId: "",
    tax: 0,
    totalPrice: 0,
    trxDate: null,
    items: [],
  };
  const [historyDetail, setHistoryDetail] = useState(initialHistoryDetail);

  const fetchHistoryDetail = async () => {
    try {
      const response = await axiosInstance.get(`/transactions/${params.id}`);
      setHistoryDetail(response.data);
    } catch (error) {
      console.erro(error);
    }
  };

  useEffect(() => {
    fetchHistoryDetail();
  }, []);

  const isOwner =
    userSelector.id !== historyDetail.userId && historyDetail.userId;

  if (isOwner) {
    return <Navigate to="/history" />;
  }

  return (
    <ProtectedPage>
      <main className="min-h-screen max-w-screen-xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">INV-{params.id}</h1>
        <h2 className="text-xl font-bold">
          {format(new Date(historyDetail.trxDate), "dd MMM yyyy HH:mm")}
        </h2>

        <Card className="col-span-5 bg-gray-50 border-none h-min my-12">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex py-4 justify-between border-b border-gray-200">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="text-sm font-medium">
                {formatRupiah(historyDetail.totalPrice)}
              </p>
            </div>
            <div className="flex py-4 justify-between border-b border-gray-200">
              <p className="text-sm text-muted-foreground">Taxes (11%)</p>
              <p className="text-sm font-medium">
                {formatRupiah(historyDetail.tax)}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex-col flex gap-4">
            <div className="flex justify-between w-full">
              <p className="font-semibold text-muted-foreground">Total</p>
              <p className="font-semibold text-lg">
                {formatRupiah(historyDetail.totalPrice + historyDetail.tax)}
              </p>
            </div>
          </CardFooter>
        </Card>

        <Table className="mb-12">
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyDetail.items.map((item) => {
              return (
                <TableRow
                  className="text-muted-foreground font-semibold"
                  key={item.id}
                >
                  <TableCell colSpan={2}>
                    <div className="flex items-center gap-4">
                      <div className="aspect-square w-[56px] overflow-hidden rounded-md">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <p className="text-semibold text-primary">
                        {item.product.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{formatRupiah(item.product.price)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {formatRupiah(item.product.price * item.quantity)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </main>
    </ProtectedPage>
  );
};
