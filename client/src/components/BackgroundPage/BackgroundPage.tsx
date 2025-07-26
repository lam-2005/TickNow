import Image from "next/image";
import React from "react";

const BackgroundPage = ({
  title,
  image,
  children,
}: {
  title: string;
  image: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`relative w-screen h-[40vh] max-lg:h-[50vh] flex max-sm:static max-sm:h-fit max-sm:flex-col max-sm:gap-5 max-sm:items-center max-sm:mt-5`}
    >
      <div className="w-full h-full absolute top-0 left-0 z-10 max-sm:hidden">
        <Image
          src={`/${image}`}
          alt={title}
          fill
          sizes="2000px"
          className="brightness-30 object-cover"
          priority
        />
      </div>
      <h1 className="absolute top-1/2 left-1/2 -translate-1/2 text-white z-11 text-4xl font-medium text-nowrap max-sm:static max-sm:translate-none">
        {title}
      </h1>
      <div className="absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 max-sm:static max-sm:translate-none">
        {children}
      </div>
    </div>
  );
};

export default BackgroundPage;
