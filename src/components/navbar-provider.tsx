"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Film, Tv } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
export default function NavBar() {
  const matches = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const size = matches ? "lg" : "md";
  return (
    <div className="flex space-x-4 items-center">
      <Button variant="outline" size="default" onClick={() => router.push("/movies")}>
        {matches ? <Film size={24} className="mr-2" /> : <></>} Movies
      </Button>
      <Button variant="outline" size="default" onClick={() => router.push("/shows")}>
        {matches ? <Tv size={24} className="mr-2" /> : <></>} Shows
      </Button>
    </div>
  );
}
