import React from "react";

const Button = ({
  title,
  className,
  disabled,
  type,
  onClick,
  btnSecondary,
}: {
  title: string;
  className?: string;

  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  btnSecondary?: boolean;
}) => {
  return (
    <button
      className={`btn-primary ${btnSecondary && "btn-secondary"} ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
