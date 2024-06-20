import { Tag } from "lucide-react";
import { Button } from "../ui/button";

const Sidebar = () => {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="w-full rounded-none justify-start"
    >
      <Tag className="w-6 h-6 mr-4" />
      Products Management
    </Button>
  );
};

export default function AdminLayout() {
  return (
    <div className="flex">
      <aside className="w-72 border-r h-screen">
        <div className="h-16 flex flex-col items-center justify-center border-b">
          <h1 className="font-bold text-2xl">Admin Dashboard</h1>
        </div>
        <div className="flex flex-col space-y-0 py-4">
          <Sidebar />
        </div>
      </aside>
      <div>Admin Layout</div>
    </div>
  );
}
