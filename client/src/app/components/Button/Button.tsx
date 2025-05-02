import React from "react";

const Button = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <button className={`btn-primary ${className}`}>
      <span>{title}</span>
    </button>
  );
};

export default Button;
