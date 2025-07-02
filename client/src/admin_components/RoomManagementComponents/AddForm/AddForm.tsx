import { Cinema } from "@/interfaces/cinema.interface";
import React, { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import ShowLayoutRoom from "./ShowLayoutRoom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { DataRoomReq } from "@/interfaces/room.interface";
import { addRoom, fetchRooms } from "@/utils/redux/slices/roomSlice";
import { toast } from "react-toastify";
export type CinemaType = {
  label: string;
  id: string;
};
type AddFormProps = {
  cinemas: Cinema[];
};
export type RoomData = {
  id_cinema: string;
  colunm: string;
  row: string;
  seatRemoved: { [key: string]: number[] };
};
const AddForm = ({ cinemas }: AddFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<RoomData>({
    id_cinema: "",
    colunm: "",
    row: "",
    seatRemoved: {},
  });
  const listOptionCinemas: CinemaType[] = cinemas.map((item) => {
    return {
      label: item.name,
      id: item._id,
    };
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      seatRemoved: {},
    }));
  }, [formData.row, formData.colunm]);
  const dataRequest: DataRoomReq = {
    id_cinema: formData.id_cinema,
    column: Number(formData.colunm),
    row: Number(formData.row),
    seatRemoved: formData.seatRemoved,
  };
  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.colunm || !formData.id_cinema || !formData.row) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const sure = confirm("Bạn có muốn thêm phòng này?");
      if (sure) {
        await dispatch(addRoom(dataRequest)).unwrap();
        await dispatch(fetchRooms({ page: 1, limit: 5 }));
        setFormData({
          id_cinema: "",
          colunm: "",
          row: "",
          seatRemoved: {},
        });
        toast.success("Thêm phòng thành công!");
      } else {
        return;
      }
    } catch (err) {
      toast.error(`Thêm phòng thất bại: ${err}`);
      console.error(err);
    }
  };
  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
          listOptionCinemas={listOptionCinemas}
        />
        <ShowLayoutRoom formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleAddRoom}>
          Thêm phòng
        </button>
      </div>
    </>
  );
};

export default AddForm;
