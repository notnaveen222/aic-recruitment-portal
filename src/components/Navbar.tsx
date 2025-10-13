"use client";

import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <div className="top-0 sticky h-14 w-full flex items-center justify-between px-24">
      <div className="font-medium text-base" onClick={() => router.push("/")}>
        Artificial Intelligence Club
      </div>
      <button
        className=" font-medium text-base"
        onClick={() => router.push("/auth/signin")}
      >
        Join Us
      </button>
    </div>
  );
}
