import React from "react";

const StatisticsCard = ({
  title,
  content,
  color,
}: {
  title: string;
  content: string;
  color?: string;
}) => {
  return (
    <div
      className={`bg-${
        color ? color : "primary"
      } text-white flex-1 p-5 space-y-2 rounded-lg font-bold`}
    >
      <div className="text-sm text-nowrap">{title}</div>
      <div className="text-lg">{content}</div>
    </div>
  );
};

export default StatisticsCard;
