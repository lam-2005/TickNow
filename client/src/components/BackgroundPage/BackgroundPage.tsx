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
    <div className={`relative w-screen h-[40vh] max-lg:h-[50vh] flex`}>
      <div className="w-full h-full  absolute top-0 left-0 z-10 ">
        <Image
          src={`/${image}`}
          alt={title}
          fill
          sizes="2000px"
          className="brightness-30 object-cover"
          priority
        />
      </div>
      <h1 className="absolute-center text-white z-11 text-4xl font-medium text-nowrap">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default BackgroundPage;
