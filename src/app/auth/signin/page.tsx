"use client";

import LoginButton from "@/components/Buttons";
import { OpacityAnimation } from "@/components/MotionAnimation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const [signInError, setSignInError] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "AccessDenied") {
      setSignInError(
        "Invalid Email Selected. Please use your official VIT student email ID."
      );
    } else {
      setSignInError("");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center grow justify-center">
      <OpacityAnimation>
        <div className="hero-bg sm:scale-110 border-white border-2 rounded-xl px-4 sm:px-10 pt-10 pb-5">
          <div className="text-white font-medium tracking-wide text-xl mb-2 text-center">
            AIC Recruitment Portal
          </div>
          <div
            className={`text-white/90 text-sm text-center ${
              signInError ? "mb-3" : "mb-7"
            } transition-all duration-150 max-w-2xs`}
          >
            Please sign in with your official VIT student email ID.
          </div>
          {signInError && (
            <div className="max-w-2xs text-center text-red-600 text-sm mt-3 mb-3">
              {signInError}
            </div>
          )}
          <LoginButton setSignInError={setSignInError} />
        </div>
      </OpacityAnimation>
    </div>
  );
}
