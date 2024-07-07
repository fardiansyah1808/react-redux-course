import { formatRupiah } from "@/lib/formatRupiah";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const HistoryItem = (props) => {
  const { trxDate, id, totalPrice, tax, items } = props;

  return (
    <div>
      <div className="rounded-md p-4 bg-slate-50 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <p className="text-muted-foreground text-sm">{trxDate}</p>
          <p className="text-muted-foreground font-semibold">INV-{id}</p>
        </div>
        <div className="flex flex-col justify-center items-end">
          <p className="text-muted-foreground text-sm">Total:</p>
          <p className="text-xl font-bold">{formatRupiah(totalPrice + tax)}</p>
          <Link to={`/history/${id}`}>
            <Button variant="link">View Detail</Button>
          </Link>
        </div>
      </div>
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
          {items.map((item) => {
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
    </div>
  );
};
