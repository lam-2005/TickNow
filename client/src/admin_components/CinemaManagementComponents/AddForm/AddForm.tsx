"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { addCinema, fetchCinema } from "@/utils/redux/slices/cinemaSlice";
import InputGroup from "./InputGroup";
import { CinemaReq, LocationRes } from "@/interfaces/cinema.interface";
import dataCinema from "@/utils/redux/selectors/selectorCinema";
import { useConfirm } from "@/hooks/contexts/useConfirm";

export type LocationOptionsType = {
  label: string;
  id: string;
};

const AddCinemaForm = ({ locations }: { locations: LocationRes[] }) => {
  const [loading, setLoading] = useState(false); // trạng thái loading
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataCinema);
  const confirm = useConfirm();
  const [formData, setFormData] = useState<CinemaReq>({
    name: "",
    image: "",
    status: 2,
    id_location: "",
    deatil_location: "",
  });

  const locationOptions: LocationOptionsType[] = locations.map((item) => ({
    label: item.name,
    id: item._id,
  }));

  const handleAddCinema = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, status, id_location, deatil_location } = formData;

    if (!name || !status || !id_location || !deatil_location) {
      toast.warning("Vui lòng nhập đầy đủ thông tin rạp chiếu!");
      return;
    }

    const confirmAdd = await confirm({
      title: "Bạn có muốn thêm Rạp chiếu mới?",
      content: "Hành động này sẽ không thể hoàn tác",
    });
    if (!confirmAdd) return;
    setLoading(true); // cho nó load

    try {
      await dispatch(
        addCinema({
          ...formData,
          status: Number(status),
        })
      ).unwrap();

      await dispatch(
        fetchCinema({
          page: 1,
          limit: 5,
          name: filter.name,
          status: filter.status,
          location: filter.location,
        })
      );

      toast.success("Thêm Rạp chiếu thành công!");

      setFormData({
        name: "",
        image: "",
        status: 2,
        id_location: "",
        deatil_location: "",
      });
    } catch (err) {
      console.error("Lỗi thêm Rạp chiếu:", err);
      toast.error(`Thêm thất bại: ${err}`);
    } finally {
      setLoading(false); // dừng load
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
          locationOptions={locationOptions}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-green rounded-2xl">
        <button
          className="btn disabled:brightness-70" // thêm class dissable
          onClick={handleAddCinema}
          disabled={loading} // loading = true thì vô hiệu nút
        >
          {loading ? "Đang xử lí.." : " Thêm Rạp Chiếu"}
        </button>
      </div>
    </>
  );
};

export default AddCinemaForm;
