"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function DMCAButton() {
    const router = useRouter();
    return (
        <div>
             <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/DMCA")}
            >
              DMCA
            </Button>
        </div>
    )
}