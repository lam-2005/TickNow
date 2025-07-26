import React from "react";

const LoadingSpin = ({ className }: { className?: string }) => {
  return (
    <div className="flex justify-center items-center h-30">
      <div
        className={`size-10 border-4 border-primary border-t-transparent rounded-full animate-spin ${className}`}
      />
    </div>
  );
};

export default LoadingSpin;
