import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ArrowType = {
  styleBtn?: string;
  onClick?: () => void;
  className?: string;
  type: 0 | 1;
};
export function SampleArrow(props: ArrowType) {
  const { onClick, className, styleBtn, type } = props;
  return (
    <button
      className={`${styleBtn}
      ${
        className?.includes("slick-disabled")
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }
      `}
      onClick={onClick}
    >
      <span>{type === 0 ? <FaChevronRight /> : <FaChevronLeft />}</span>
    </button>
  );
}
