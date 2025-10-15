"use client";
import React, { useRef } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { easeOut } from "motion";
import { CanvasRevealEffect } from "./CanvasRevealEffect";
import { OpacityAnimation } from "./MotionAnimation";

function StaggerAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const parentVariants = {
    hidden: { filter: "blur(10px)", scale: 0.98 },
    show: {
      filter: "blur(0px)",
      scale: 1,
      transition: {
        ease: easeOut,
        duration: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={parentVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex flex-row flex-wrap justify-center gap-y-5 w-full gap-x-8 my-14"
    >
      {children}
    </motion.div>
  );
}

export default function Departments() {
  const DEPT = [
    "Operations",
    "Technical",
    "Creatives",
    "Visual Media",
    "Outreach",
  ];
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };
  return (
    <div className="w-screen flex flex-col pt-14 mb-10 justify-center items-center">
      <OpacityAnimation delay={0.5}>
        <div className="text-4xl sm:text-5xl text-center font-medium">
          Our Departments
        </div>
      </OpacityAnimation>

      <div className="flex flex-col flex-wrap justify-center gap-y-5 w-full gap-x-8 my-0 sm:my-14">
        <StaggerAnimation>
          {DEPT.map((dept, idx) => (
            <motion.div key={idx} variants={childVariants}>
              <Card title={dept} desc={DEPT_DESC[dept]}>
                <CanvasRevealEffect
                  animationSpeed={6}
                  containerClassName="bg-black"
                  colors={DEPT_COLORS[dept]}
                  dotSize={2}
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
              </Card>
            </motion.div>
          ))}
        </StaggerAnimation>
      </div>
    </div>
  );
}

const Card = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] cursor-none group/canvas-card flex items-center justify-center dark:border-white/[0.2] hover:border-neutral-600  transition-all duration-200  w-[150px] sm:min-w-3xs mx-auto p-2 sm:p-4 relative h-60 sm:h-[400px] "
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-full cursor-none w-full hidden sm:flex z-20 items-center justify-center ">
        <div
          className="absolute text-center text-2xl font-semibold transition duration-300 
               group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0"
        >
          {title}
        </div>
        <div
          className="absolute text-center text-white text-sm font-semibold sm:text-base opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:-translate-y-2 
               transition cursor-none duration-300 max-w-[220px] px-2 leading-relaxed"
        >
          {desc}
        </div>
      </div>
      <div className="relative h-full cursor-none  w-full flex sm:hidden flex-col items-start z-20 ">
        <div
          className=" text-center text-xl font-semibold transition duration-300 
               group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 mb-14"
        >
          {title}
        </div>
        <div className="text-sm text-right cursor-none">{desc}</div>
      </div>
    </div>
  );
};

export const Icon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const DEPT_COLORS: Record<string, number[][]> = {
  Operations: [
    [16, 185, 129],
    [110, 231, 183],
  ],
  Technical: [
    [59, 130, 246],
    [125, 211, 252],
  ],
  Creatives: [
    [236, 72, 153],
    [232, 121, 249],
  ],
  "Visual Media": [
    [249, 115, 22],
    [253, 186, 116],
  ],
  Outreach: [
    [139, 92, 246],
    [196, 181, 253],
  ],
};

const DEPT_DESC: Record<string, string> = {
  Operations:
    "Handles planning, logistics, and smooth execution of every club event, ensuring everything runs on schedule.",
  Technical:
    "Powers the club’s digital side through websites, software, and tech solutions for projects and events.",
  Creatives:
    "Brings ideas to life through design, content, and concepts that reflect the club’s creativity.",
  "Visual Media":
    "Captures and showcases moments through photography, videography, and editing to tell our story.",
  Outreach:
    "Builds partnerships, manages promotions, and connects the club with the student community and beyond.",
};
