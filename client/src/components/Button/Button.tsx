import React from "react";

const Button = ({
  title,
  className,
  dataAosDelay,
  dataAos,
  disabled,
}: {
  title: string;
  className?: string;
  dataAosDelay?: number;
  dataAos?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`btn-primary ${className}`}
      data-aos-delay={dataAosDelay}
      data-aos={dataAos}
      disabled={disabled}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
