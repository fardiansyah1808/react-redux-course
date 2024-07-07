import { HistoryItem } from "@/components/HistoryItem";
import ProtectedPage from "@/components/guard/ProtectedPage";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const userSelector = useSelector((state) => state.user);
  const fetchTrx = async () => {
    try {
      const response = await axiosInstance.get("/transactions", {
        params: {
          userId: userSelector.id,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrx();
  }, [userSelector.id]);

  return (
    <ProtectedPage>
      <main className="min-h-screen max-w-screen-xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="flex flex-col mt-8 gap-24">
          {transactions.map((transaction) => (
            <HistoryItem
              key={transaction.id}
              id={transaction.id}
              trxDate={format(
                new Date(transaction.trxDate),
                "dd MMM yyyy HH:mm"
              )}
              totalPrice={transaction.totalPrice}
              tax={transaction.tax}
              items={transaction.items}
            />
          ))}
        </div>
      </main>
    </ProtectedPage>
  );
};

export default HistoryPage;
