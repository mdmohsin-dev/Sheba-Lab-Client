import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <div>
      <h1 className="text-3xl font-bold underline">Welcome to my Next.js!</h1>
      <Button variant="outline">Click me</Button>
   </div>
  );
}
