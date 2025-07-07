import React from "react";

const LoadingSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`h-[370px] bg-loading animate-pulse container w-[80%] rounded-xl ${className}`}
    ></div>
  );
};

export default LoadingSkeleton;
