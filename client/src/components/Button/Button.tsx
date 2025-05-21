import React from "react";

const Button = ({
  title,
  className,
  dataAosDelay,
  dataAos,
  disabled,
  type,
}: {
  title: string;
  className?: string;
  dataAosDelay?: number;
  dataAos?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}) => {
  return (
    <button
      className={`btn-primary ${className}`}
      data-aos-delay={dataAosDelay}
      data-aos={dataAos}
      disabled={disabled}
      type={type}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
