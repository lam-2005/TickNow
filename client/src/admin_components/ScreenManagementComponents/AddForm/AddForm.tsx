"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchScreen, addScreen } from "@/utils/redux/slices/screenSlice";
import { toast } from "react-toastify";
import InputGroup from "./InputGroup";
import { ScreenReq } from "@/interfaces/screening.interface";
import { MovieType } from "@/interfaces/movie.interface";
import { RoomType } from "@/interfaces/room.interface";
import dataScreen from "@/utils/redux/selectors/screenSelector";
export type MovieOptionsType = {
  label: string;
  id: string;
};
const AddForm = ({
  movies,
  rooms,
}: {
  movies: MovieType[];
  rooms: RoomType[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataScreen);
  const [formData, setFormData] = useState<ScreenReq>({
    id_room: "",
    id_movie: "",
    time_start: "",
    date: "",
    showtype: "1",
    price: "",
  });
  const listOptionMovies: MovieOptionsType[] = movies.map((item) => {
    return {
      label: item.name,
      id: item._id,
    };
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.id_room ||
      !formData.id_movie ||
      !formData.time_start ||
      !formData.date ||
      !formData.showtype ||
      !formData.price
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!!");
      return;
    }

    const confirmAdd = confirm("Bạn có muốn thêm Suất chiếu mới?");
    if (!confirmAdd) return;

    try {
      await dispatch(
        addScreen({
          ...formData,
          showtype: Number(formData.showtype),
          price: Number(formData.price),
        })
      ).unwrap();

      await dispatch(
        fetchScreen({
          page: 1,
          limit: 5,
          date: filter.date,
          movie: filter.movie,
          showtype: filter.showtype,
          status: filter.status,
          timeEnd: filter.timeEnd,
          timeStart: filter.timeStart,
        })
      );
      toast.success("Thêm Suất chiếu thành công!");

      // Reset
      setFormData({
        id_room: "",
        id_movie: "",
        time_start: "",
        date: "",
        showtype: "",
        status: "",
        price: "",
      });
    } catch (err) {
      console.error("Lỗi thêm Suất chiếu:", err);
      toast.error(`Thêm Suất chiếu thất bại: ${err}`);
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
          listOptionMovies={listOptionMovies}
          listOptionRooms={rooms}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-green rounded-2xl">
        <button className="btn" onClick={handleAddUser}>
          Thêm Suất chiếu
        </button>
      </div>
    </>
  );
};

export default AddForm;
