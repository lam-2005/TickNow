import React from "react";
import PopupContainer from "./PopupContainer";

const TrailerPopup = ({
  name,
  url,
  onClose,
}: {
  name: string;
  url: string;
  onClose: () => void;
}) => {
  return (
    <PopupContainer onClose={onClose}>
      <h2>{name}</h2>
      <div className="flex-1 flex gap-5 justify-end max-lg:hidden w-full">
        <iframe
          className={`rounded-2xl aspect-[16/9] w-full`}
          src={`${url}?autoplay=1&enablejsapi=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;  encrypted-media;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </PopupContainer>
  );
};

export default TrailerPopup;
