"use client";

import React from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FadeDownAnimation } from "./MotionAnimation";

const DURATION = 0.25;
const STAGGER = 0.025;

// ✨ Reusable FlipText animation
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
      className="relative block overflow-hidden whitespace-nowrap"
      style={{ lineHeight: 1.15 }} // ⬅️ give extra breathing room for descenders
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
            style={{ paddingBottom: "0.05em" }} // ⬅️ ensures “g” doesn’t clip
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
            style={{ paddingBottom: "0.05em" }} // ⬅️ same fix for the second layer
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
  const pathName = usePathname();
  const { status } = useSession();

  const handleClick = () => {
    if (pathName !== "/apply") {
      if (status === "authenticated") router.push("/apply");
      else router.push("/auth/signin");
    } else {
      signOut();
      router.push("/auth/signin");
    }
  };

  const buttonLabel = pathName !== "/apply" ? "Join Us" : "Logout";

  return (
    <FadeDownAnimation delay={0.3}>
      <div className="top-0 sticky h-14 w-full flex items-center justify-between px-4 z-50 backdrop-blur-xs sm:px-24">
        <div
          className="font-medium text-base cursor-pointer"
          onClick={() => router.push("/")}
        >
          <FlipText text="Artificial Intelligence Club" zeroDelay />
        </div>

        {/* 🔥 Animated Join Us / Logout Button */}
        <motion.button
          onClick={handleClick}
          className="relative font-medium text-base "
          whileTap={{ scale: 0.95 }}
        >
          <FlipText text={buttonLabel} />
        </motion.button>
      </div>
    </FadeDownAnimation>
  );
}
