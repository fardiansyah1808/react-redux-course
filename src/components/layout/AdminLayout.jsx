import { ShoppingCart, Tag, User } from "lucide-react";
import { Button } from "../ui/button";

const sidebarItems = [
  {
    icon: <Tag className="w-6 h-6 mr-4" />,
    label: "Products Management",
  },
  {
    icon: <ShoppingCart className="w-6 h-6 mr-4" />,
    label: "Order Management",
  },
];

const SidebarItems = (props) => {
  const { icon, label } = props;
  return (
    <Button
      variant="ghost"
      size="lg"
      className="w-full rounded-none justify-start"
    >
      {icon}
      {label}
    </Button>
  );
};

export default function AdminLayout(props) {
  const { title, description, rightSection = null, children } = props;
  return (
    <div className="flex">
      <aside className="w-72 border-r h-screen">
        <div className="h-16 flex flex-col items-center justify-center border-b">
          <h1 className="font-bold text-2xl">Admin Dashboard</h1>
        </div>
        <div className="flex flex-col space-y-0 py-4">
          {sidebarItems.map((item, index) => (
            <SidebarItems key={index} icon={item.icon} label={item.label} />
          ))}
        </div>
      </aside>
      <div className="flex-1">
        <header className="h-16 border-b w-full flex justify-end items-center px-8">
          <Button variant="outline" className="rounded-full" size="icon">
            <User className="w-6 h-6" />
          </Button>
        </header>
        <main className="flex flex-col p-4">
          <div className="flex justify-between items-center pb-4 border-b mb-8">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            {rightSection}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
