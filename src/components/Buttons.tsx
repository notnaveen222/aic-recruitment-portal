"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginButton({
  setSignInError,
}: {
  setSignInError: (signInError: string) => void;
}) {
  return (
    <button
      className="w-full flex items-center border-2 border-white/65 hover:border-white justify-center text-white py-2 mb-2 gap-x-2 text-sm font-semibold rounded-lg  transition-all duration-250 backdrop-blur-lg hover:backdrop-blur-none"
      onClick={() => {
        setTimeout(() => {
          setSignInError("");
        }, 2000);
        signIn("google", { callbackUrl: "/apply" });
      }}
    >
      Login With Google
    </button>
  );
}

export function NeonButton({ title }: { title: string }) {
  return <button className="neon-button cursor-none mb-1 mr-2">{title}</button>;
}

export function ApplyNowButton({ title }: { title: string }) {
  const router = useRouter();
  const { status } = useSession();
  return (
    <button
      className="ApplyNowButton mx-auto"
      onClick={() => {
        if (status == "authenticated") {
          router.push("/apply");
        } else {
          router.push("/auth/signin");
        }
      }}
    >
      <span>{title}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
        <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
        <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
        <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
      </svg>
    </button>
  );
}
