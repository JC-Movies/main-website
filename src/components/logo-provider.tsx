"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
    const router = useRouter();
    const handleClick = () => {
        router.replace("/");
    }
    return (
        <Image onClick={handleClick}
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
        />
    );
}