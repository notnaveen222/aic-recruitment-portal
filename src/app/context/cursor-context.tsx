"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";

type CursorHoverContextType = {
  cursorHover: boolean;
  setCursorHover: Dispatch<SetStateAction<boolean>>;
};

export const cursorHoverContext = createContext<CursorHoverContextType>({
  cursorHover: false,
  setCursorHover: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorHover, setCursorHover] = useState(false);
  const value = useMemo(() => ({ cursorHover, setCursorHover }), [cursorHover]);
  return (
    <cursorHoverContext.Provider value={value}>
      {children}
    </cursorHoverContext.Provider>
  );
}
