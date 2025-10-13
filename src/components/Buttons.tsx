"use client";

import { signIn, useSession } from "next-auth/react";
import { useContext } from "react";
import { cursorHoverContext } from "@/app/context/cursor-context";
import { useRouter } from "next/navigation";
//if already has a session, skip the login page and go to apply page
export default function LoginButton({
  setSignInError,
}: {
  setSignInError: (signInError: string) => void;
}) {
  const { setCursorHover } = useContext(cursorHoverContext);
  const handleSignIn = async () => {
    try {
      const res = await signIn("google", {
        callbackUrl: "/apply",
        redirect: false,
      });
      if (res?.url?.includes("error=AccessDenied")) {
        setSignInError(
          "Invalid Email Selected, Please use a VIT student email ID."
        );
      } else if (res?.ok) {
        setSignInError(""); // Clear any previous errors on successful sign in
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setSignInError(
        "Invalid Email Selected, Please use a VIT student email ID."
      );
    }
  };
  return (
    <button
      className="w-full flex items-center border-2 border-white/65 hover:border-white justify-center text-white py-2 mb-2 gap-x-2 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-250 backdrop-blur-lg hover:backdrop-blur-none"
      onMouseEnter={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
      onClick={() => handleSignIn()}
    >
      Login With Google
    </button>
  );
}

//check auth route.ts, dk what it does
//google sign in btn created
//add redirect to departments page
//check bout session

export function NeonButton({ title }: { title: string }) {
  const { setCursorHover } = useContext(cursorHoverContext);
  return (
    <button
      className="neon-button cursor-pointer mb-1 mr-2"
      onMouseEnter={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
    >
      {title}
    </button>
  );
}

export function ApplyNowButton({ title }: { title: string }) {
  const router = useRouter();
  const { status } = useSession();
  const { setCursorHover } = useContext(cursorHoverContext);
  return (
    <button
      className="ApplyNowButton mx-auto"
      onMouseEnter={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
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
