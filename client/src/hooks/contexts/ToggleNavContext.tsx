"use client";
import { createContext, useContext, useState } from "react";
interface ToggleNavContextType {
  toggle: boolean;
  setToggle: (state: boolean) => void;
}
export const ToggleNavContext = createContext<ToggleNavContextType | undefined>(
  undefined
);
export const useToggleNav = (): ToggleNavContextType => {
  const context = useContext(ToggleNavContext);
  if (!context)
    throw new Error("useToggleNav must be used within ToggleNavContext");
  return context;
};

export function ToggleNavProvider({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <ToggleNavContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleNavContext.Provider>
  );
}
