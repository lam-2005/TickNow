export default interface SliderProps {
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  dots?: boolean;
  customPaging?: (i?: number) => React.ReactElement;
  appendDots?: (dots: React.ReactNode) => React.ReactElement;
  children: React.ReactNode;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
}
