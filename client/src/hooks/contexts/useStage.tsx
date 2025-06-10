"use client";
import React, { createContext, useContext, useState } from "react";

export type TypeStage = 1 | 2 | 3;

interface StageContextType {
  stage: TypeStage;
  setStage: (stage: TypeStage) => void;
  nextStage: () => void;
  prevStage: () => void;
}

const StageContext = createContext<StageContextType | undefined>(undefined);

export const useStage = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error("useStage must be used within a StageProvider");
  }
  return context;
};

export const StageProvider = ({ children }: { children: React.ReactNode }) => {
  const [stage, setStage] = useState<TypeStage>(1);

  const nextStage = () => {
    setStage((prev) => (prev < 3 ? ((prev + 1) as TypeStage) : 3));
  };

  const prevStage = () => {
    setStage((prev) => (prev > 1 ? ((prev - 1) as TypeStage) : 1));
  };

  return (
    <StageContext.Provider value={{ stage, setStage, nextStage, prevStage }}>
      {children}
    </StageContext.Provider>
  );
};
