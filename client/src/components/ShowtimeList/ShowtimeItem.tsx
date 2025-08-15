const ShowtimeItem = ({
  nameCinema,
  children,
}: {
  nameCinema?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2.5 not-first:before:w-full not-first:before:h-px not-first:before:my-2  before:bg-white before:absolute before:-translate-y-[15px]">
      <h3 className="font-semibold">{nameCinema}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
};
export default ShowtimeItem;
