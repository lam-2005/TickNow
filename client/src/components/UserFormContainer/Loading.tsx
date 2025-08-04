import React from "react";

const Loading = ({ title }: { title: React.ReactElement | string }) => {
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed z-2000 inset-0 flex-center gap-4">
      <div className="size-10 border-4 border-primary border-b-transparent rounded-full animate-spin "></div>
      {title}
    </div>
  );
};

export default Loading;
