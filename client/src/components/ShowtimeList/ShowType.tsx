export const TimeScreening = ({
  value,
  onClick,
  className,
}: {
  value: string;
  onClick?: () => void;
  className?: string;
}) => (
  <div
    onClick={onClick}
    className={`flex-center py-1 px-4 border-2 border-primary w-fit rounded-[5px] text-sm cursor-pointer hover:bg-primary hover:text-white transition-all ${className}`}
  >
    {value}
  </div>
);
const ShowType = ({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-7.5 items-center">
      <p className="w-25">{type}</p>
      <div className="flex gap-2.5 flex-wrap">{children}</div>
    </div>
  );
};
export default ShowType;
