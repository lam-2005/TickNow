import React from "react";
type Props = {
  title: string;
  color?: "warning" | "success" | "error";
  className?: string;
};
const Status = ({ color, className, title }: Props) => {
  let bgStatus = "bg-green-200";
  let colerStatus = "bg-success";
  let textStatus = "text-success";
  if (color === "warning") {
    bgStatus = "bg-yellow-100";
    colerStatus = "bg-warning";
    textStatus = "text-warning";
  } else if (color === "success") {
    bgStatus = "bg-green-200";
    colerStatus = "bg-success";
    textStatus = "text-success";
  } else if (color === "error") {
    bgStatus = "bg-red-200";
    colerStatus = "bg-error";
    textStatus = "text-error";
  }
  return (
    <div
      className={`${bgStatus} flex-center gap-2 rounded-[100px] px-3 py-1 ${className} w-fit`}
    >
      <div className={`${colerStatus} size-2.5 rounded-full`}></div>
      <p className={`${textStatus} text-sm font-bold text-nowrap`}>{title}</p>
    </div>
  );
};

export default Status;
