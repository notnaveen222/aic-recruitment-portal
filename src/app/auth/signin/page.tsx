"use client";
import LoginButton from "@/components/Buttons";
import { useState } from "react";

export default function SignIn() {
  const [signInError, setSignInError] = useState<string>("");
  return (
    <div className="flex flex-col items-center grow  justify-center">
      <div className="hero-bg border-white border-2 rounded-xl px-4 sm:px-10 pt-10 pb-5">
        <div className="text-white font-medium tracking-wide text-xl mb-2 text-center">
          AIC Recruitment Portal
        </div>
        <div className="text-white/90 text-sm text-center mb-7 max-w-2xs">
          Please signin with your official VIT student email ID.
        </div>
        <LoginButton setSignInError={setSignInError} />
        {signInError != "" && (
          <div className="max-w-2xs text-center">
            Invalid Email Selected, Please use a{" "}
            <span className="underline">VIT student email ID.</span>
          </div>
        )}
      </div>
    </div>
  );
}
