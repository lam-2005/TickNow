import React from "react";

const Button = ({
  title,
  className,
  dataAosDelay,
  dataAos,
  disabled,
  type,
  onClick,
  btnSecondary,
}: {
  title: string;
  className?: string;
  dataAosDelay?: number;
  dataAos?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  btnSecondary?: boolean;
}) => {
  return (
    <button
      className={`btn-primary ${btnSecondary && "btn-secondary"} ${className}`}
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
