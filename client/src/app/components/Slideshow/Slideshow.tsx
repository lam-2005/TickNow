import React from "react";
import Button from "../Button/Button";

const Slideshow = () => {
  return (
    <div className="bg-sky-500 w-screen h-screen relative z-1 flex snap-start">
      <div className="w-full h-full">
        <img
          src="https://thethaovanhoa.mediacdn.vn/372676912336973824/2025/4/22/muadostill-029-174529263659343417075.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full absolute top-0 left-0 brightness-40 backdrop-blur-[0px]  z-1"></div>
      <div className="container absolute left-1/2 top-9/20 -translate-1/2 z-2  flex gap-7.5 items-center">
        <div className="w-[40%] flex flex-col items-start gap-4">
          <h1 className="line-clamp-1" title="Phim">
            Phim supercalifragilisticexpialidocious
          </h1>
          <div className="flex items-center gap-2.5 text-white text-sm ">
            <span className="bg-primary py-0.75 px-2 rounded-[5px] font-semibold italic">
              18+
            </span>
            <span
              className="w-px h-3.5 bg-subtitle block"
              aria-hidden="true"
            ></span>
            <span>90min</span>
            <span
              className="w-px h-3.5 bg-subtitle block"
              aria-hidden="true"
            ></span>
            <span>Tình cảm</span>
          </div>
          <p
            title="Phim"
            className="text-white line-clamp-5 text-justify font-medium"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            suscipit dolor aliquid autem voluptate maiores vel excepturi, cum
            asperiores obcaecati at ipsam incidunt optio dolore distinctio ut
            quae quam. Beatae. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Aliquam consectetur vel asperiores neque ipsam
            doloribus sunt error placeat laboriosam, odit inventore tempora
            exercitationem molestiae ratione assumenda earum repudiandae
            consequatur? Voluptatum.
          </p>
          <Button
            title="Đặt vé ngay"
            className="text-xl font-semibold w-[200px]"
          />
        </div>
        <div className="flex-1 flex gap-5 justify-end">
          <iframe
            className="rounded-2xl"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/NDonnQvCdMw?si=4UiQM1gTKrTjDUkP"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="container absolute bottom-[20px] left-1/2 -translate-x-1/2 z-2 flex justify-center">
        <div className="flex flex-col gap-5">
          <div className="text-subtitle font-semibold">Đang chiếu gần đây</div>
          <div className="gap-5 flex">
            <div className="w-45 h-25 bg-black scale-110"></div>
            <div className="w-45 h-25 bg-black"></div>
            <div className="w-45 h-25 bg-black"></div>
            <div className="w-45 h-25 bg-black"></div>
            <div className="w-45 h-25 bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
