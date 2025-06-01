const SeatNote = ({ color, content }: { color: string; content: string }) => {
  return (
    <div className="flex-center gap-2.5">
      <div className={`size-[30px] ${color} rounded-[5px]`}></div>
      <p>{content}</p>
    </div>
  );
};
export default SeatNote;
