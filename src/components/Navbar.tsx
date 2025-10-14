"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const { status } = useSession();
  return (
    <div className="top-0 sticky h-14 w-full flex items-center justify-between px-4 sm:px-24">
      <div className="font-medium text-base" onClick={() => router.push("/")}>
        Artificial Intelligence Club
      </div>
      {pathName != "/apply" ? (
        <button
          className=" font-medium text-base"
          onClick={() => {
            if (status == "authenticated") {
              router.push("/apply");
            } else {
              router.push("/auth/signin");
            }
          }}
        >
          Join Us
        </button>
      ) : (
        <button
          className="cursor-pointer font-medium text-base"
          onClick={() => {
            signOut();
            router.push("/auth/signin");
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
