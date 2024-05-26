import { Headset } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t-2 border-gray-200 flex justify-between items-center h-16">
      <p>Fardiansyah Copyright © 2024</p>
      <Button>
        <Headset className="mr-2 h-4 w-4" /> Contact Me
      </Button>
    </footer>
  );
}
