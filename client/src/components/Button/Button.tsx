import React from "react";

const Button = ({
  title,
  className,
  dataAosDelay,
  dataAos,
  disabled,
  type,
  onClick,
}: {
  title: string;
  className?: string;
  dataAosDelay?: number;
  dataAos?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
}) => {
  return (
    <button
      className={`btn-primary ${className}`}
      data-aos-delay={dataAosDelay}
      data-aos={dataAos}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
