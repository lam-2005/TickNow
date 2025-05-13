import React from "react";

const Button = ({
  title,
  className,
  dataAosDelay,
  dataAos,
}: {
  title: string;
  className?: string;
  dataAosDelay?: number;
  dataAos?: string;
}) => {
  return (
    <button
      className={`btn-primary ${className}`}
      data-aos-delay={dataAosDelay}
      data-aos={dataAos}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
