import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
  const [count, setCount] = useState(0);
  const counterSelector = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" });
  };

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  const handleSetCount = () => {
    dispatch({ type: "SET", payload: parseInt(count) });
    setCount(0);
  };

  return (
    <main className="min-h-[90vh] max-w-screen-xl mx-auto px-4 my-8 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Counter: {counterSelector}</h1>
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="w-16"
          onClick={handleIncrement}
        >
          <PlusIcon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-16"
          onClick={handleDecrement}
        >
          <MinusIcon />
        </Button>
        <Input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <Button size="sm" onClick={handleSetCount}>
          Submit
        </Button>
      </div>
    </main>
  );
}
