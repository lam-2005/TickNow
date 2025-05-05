import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ArrowType {
  onClick?: () => void;
  className?: string;
}
export function SampleNextArrow(props: ArrowType) {
  const { onClick, className } = props;
  return (
    <button
      className={`w-11.25 h-11.25 lg:bg-[rgba(255,255,255,.3)] bg-white
      text-lg rounded-[50%] absolute top-1/2 right-0 z-10 -translate-y-[70px] translate-x-[20px]
      flex-center text-black hover:bg-white 
      ${
        className?.includes("slick-disabled")
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }
      `}
      onClick={onClick}
    >
      <span>
        <FaChevronRight />
      </span>
    </button>
  );
}

export function SamplePrevArrow(props: ArrowType) {
  const { onClick, className } = props;
  return (
    <div
      className={`w-11.25 h-11.25 lg:bg-[rgba(255,255,255,.3)] bg-white text-lg rounded-[50%] 
      flex-center text-black hover:bg-white absolute top-1/2 left-0 z-10
      -translate-y-[70px] -translate-x-[20px]
            ${
              className?.includes("slick-disabled")
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }
      `}
      onClick={onClick}
    >
      <span>
        <FaChevronLeft />
      </span>
    </div>
  );
}
