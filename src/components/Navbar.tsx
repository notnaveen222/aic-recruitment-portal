"use client";

import React from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FadeDownAnimation } from "./MotionAnimation";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipText = ({
  text,
  zeroDelay,
}: {
  text: string;
  zeroDelay?: boolean;
}) => {
  const letters = text
    .split("")
    .map((char) => (char === " " ? "\u00A0" : char));

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap cursor-none "
      style={{ lineHeight: 1.15 }}
    >
      <div className="overflow-visible">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-110%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: zeroDelay ? 0 : STAGGER * i,
            }}
            className="inline-block will-change-transform"
            style={{ paddingBottom: "0.05em" }}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 overflow-visible">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: zeroDelay ? 0 : STAGGER * i,
            }}
            className="inline-block will-change-transform"
            style={{ paddingBottom: "0.05em" }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // ✅ Button label depends purely on session
  const buttonLabel = status === "authenticated" ? "Logout" : "Join Us";

  const handleClick = () => {
    if (status === "authenticated") {
      signOut();
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <div className="top-0 sticky h-14 backdrop-blur-xs z-50 w-full">
      <FadeDownAnimation delay={0.3}>
        <div className="flex items-center h-14 justify-between px-4 sm:px-24">
          <div
            className="font-medium text-base cursor-pointer"
            onClick={() => router.push("/")}
          >
            <FlipText text="Artificial Intelligence Club" zeroDelay />
          </div>

          <motion.button
            onClick={handleClick}
            className="relative font-medium text-base border-b-2 border-b-border"
            whileTap={{ scale: 0.95 }}
          >
            <FlipText text={buttonLabel} />
          </motion.button>
        </div>
      </FadeDownAnimation>
    </div>
  );
}
