import { Cinema } from "@/interfaces/cinema.interface";
import React, { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import ShowLayoutRoom from "./ShowLayoutRoom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { DataRoomReq, RoomType } from "@/interfaces/room.interface";
import { fetchRooms, updateRoom } from "@/utils/redux/slices/roomSlice";
import { toast } from "react-toastify";
import dataRoom from "@/utils/redux/selectors/roomSelector";
import usePanigation from "@/hooks/usePanigation";
export type CinemaType = {
  label: string;
  id: string;
};
type UpdateFormProps = {
  cinemas: Cinema[];
  closeForm: () => void;
  info: RoomType;
};
export type RoomData = {
  id_cinema: string;
  colunm: string;
  row: string;
  seatRemoved: { [key: string]: number[] };
};
const UpdateForm = ({ cinemas, closeForm, info }: UpdateFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector(dataRoom);
  const { rowsPerPage } = usePanigation(currentPage);
  const [formData, setFormData] = useState<RoomData>({
    id_cinema: info.id_cinema,
    colunm: String(info.diagram.column),
    row: String(info.diagram.row),
    seatRemoved: info.diagram.element_remove,
  });
  const listOptionCinemas: CinemaType[] = cinemas.map((item) => {
    return {
      label: item.name,
      id: item._id,
    };
  });
  useEffect(() => {
    if (
      formData.row !== String(info.diagram.row) ||
      formData.colunm !== String(info.diagram.column)
    ) {
      setFormData((prev) => ({
        ...prev,
        seatRemoved: {},
      }));
    }
  }, [formData.row, formData.colunm]);
  const dataRequest: DataRoomReq = {
    id_cinema: formData.id_cinema,
    column: Number(formData.colunm),
    row: Number(formData.row),
    seatRemoved: formData.seatRemoved,
  };
  const handleUpdateRoom = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.colunm || !formData.id_cinema || !formData.row) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const sure = confirm("Bạn có muốn cập nhật phòng này?");
      if (sure) {
        await dispatch(updateRoom({ id, data: dataRequest })).unwrap();

        await dispatch(fetchRooms({ page: currentPage, limit: rowsPerPage }));
        toast.success("Cập nhật phòng thành công!");
        closeForm();
      } else {
        return;
      }
    } catch (err) {
      toast.error(`Cập nhật phòng thất bại: ${err}`);
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
        <button className="btn" onClick={(e) => handleUpdateRoom(info._id, e)}>
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
