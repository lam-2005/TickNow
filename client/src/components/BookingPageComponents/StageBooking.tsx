const StageBooking = () => (
  <div className="flex-center">
    <div className="text-lg font-bold w-50 flex-center py-2.5 border-b-2 border-primary gap-2.5">
      <span className="size-[30px] bg-background-card flex-center rounded-[5px]">
        1
      </span>
      <p>Chọn ghế</p>
    </div>
    <div className="text-lg font-bold w-50 flex-center py-2.5 border-b-2 border-subtitle gap-2.5">
      <span className="size-[30px] bg-background-card flex-center rounded-[5px] text-subtitle">
        2
      </span>
      <p className="text-subtitle">Thanh toán</p>
    </div>
    <div className="text-lg font-bold w-50 flex-center py-2.5 border-b-2 border-subtitle gap-2.5">
      <span className="size-[30px] bg-background-card flex-center rounded-[5px] text-subtitle">
        3
      </span>
      <p className="text-subtitle">Xác nhận</p>
    </div>
  </div>
);
export default StageBooking;
