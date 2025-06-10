import { FaCheck } from "react-icons/fa6";

const Stage = ({
  title,
  stage,
  currentStage,
}: {
  title: string;
  stage: number;
  currentStage: number;
}) => {
  const isActived = currentStage === stage;
  const isDone = currentStage > stage || (currentStage === 3 && stage === 3);
  return (
    <div
      className={`text-lg font-bold w-50 flex-center py-2.5 border-b-2  gap-2.5 ${
        isActived ? "border-primary" : "border-subtitle"
      }`}
    >
      <span
        className={`size-[30px] bg-background-card flex-center rounded-[5px] ${
          isActived ? "" : "text-subtitle"
        }`}
      >
        {isDone ? (
          <div className=" size-full flex-center rounded-[5px] bg-primary">
            <FaCheck size={16} color="#fff" />
          </div>
        ) : (
          stage
        )}
      </span>
      <p className={`${isActived ? "text-foreground" : "text-subtitle"}`}>
        {title}
      </p>
    </div>
  );
};
const StageBooking = ({ currentStage }: { currentStage: number }) => (
  <div className="flex-center">
    <Stage title="Chọn ghế" stage={1} currentStage={currentStage} />
    <Stage title="Thanh toán" stage={2} currentStage={currentStage} />
    <Stage title="Xác nhận" stage={3} currentStage={currentStage} />
  </div>
);
export default StageBooking;
