"use client";
import { useRef, useEffect } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<SVGSVGElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const speed = 0.2;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX + 2;
      mouse.current.y = e.clientY + 2;
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={cursorRef}
      className="fixed pointer-events-none invisible md:visible h-6 w-6 text-white z-[100]"
      viewBox="0 0 24 24"
      fill="black"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 10.8C21.1 10.5 21.4 10.4 21.5 10.2C21.6 10.1 21.6 9.9 21.5 9.8C21.4 9.6 21.1 9.5 20.5 9.3L4.6 3.6C4.1 3.4 3.8 3.3 3.7 3.4C3.5 3.4 3.4 3.5 3.4 3.7C3.3 3.8 3.4 4.1 3.6 4.6L9.3 20.5C9.5 21.1 9.6 21.4 9.8 21.5C9.9 21.6 10.1 21.6 10.2 21.5C10.4 21.4 10.5 21.1 10.8 20.5L13.4 13.8C13.4 13.7 13.4 13.6 13.5 13.6C13.6 13.5 13.7 13.5 13.8 13.4L20.5 10.8Z" />
    </svg>
  );
}
