import React, { ReactNode } from "react";

const HeadingCard = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <div className={"flex-between"}>
      <h2 className="uppercase font-bold text-2xl">{title}</h2>
      {children}
    </div>
  );
};

export default HeadingCard;
