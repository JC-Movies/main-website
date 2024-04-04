"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Search, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SmallSearch() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const search = () => {
    if (query === "") return;
    router.push(`/search?query=${query}`);
  }
  return (
    <Drawer>
      <DrawerTrigger>
        <Search />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Search</DrawerTitle>
          <DrawerDescription>Search for a movie or TV show</DrawerDescription>
          <Input placeholder="Search" onChange={(e) => setQuery(e.target.value)} value={query}/>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose >
            <Button onClick={search}><SearchIcon /> Search</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
