"use client";
import React, { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import { DetailScreening, ScreenReq } from "@/interfaces/screening.interface";
import { RoomType } from "@/interfaces/room.interface";
import { MovieType } from "@/interfaces/movie.interface";
import { MovieOptionsType } from "../AddForm/AddForm";
import { getScreeningList } from "@/services/screening.service";
import { fetchScreen, updateScreen } from "@/utils/redux/slices/screenSlice";
import { AppDispatch } from "@/utils/redux/store";
import dataScreen from "@/utils/redux/selectors/screenSelector";
import usePanigation from "@/hooks/usePanigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useConfirm } from "@/hooks/contexts/useConfirm";

const UpdateForm = ({
  id,
  rooms,
  movies,
  closeForm,
}: {
  id: string;
  rooms: RoomType[];
  movies: MovieType[];
  closeForm: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const confirm = useConfirm();
  const [formData, setFormData] = useState<ScreenReq>({
    id_room: "",
    id_movie: "",
    time_start: "",
    date: "",
    showtype: 1,
    price: "",
    id_cinema: "",
    status: 2,
  });
  const listOptionMovies: MovieOptionsType[] = movies.map((item) => {
    return {
      label: item.name,
      id: item._id,
    };
  });
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, filter } = useSelector(dataScreen);
  const { rowsPerPage } = usePanigation(currentPage);
  // useEffect(() => {

  // }, [formData.date]);
  useEffect(() => {
    const getScreengDetail = async (id: string) => {
      try {
        const res = await getScreeningList(`/${id}`);
        const data: DetailScreening = res?.data;

        const currentDate = new Date();
        const selectedDate = new Date(data.screening.date.slice(0, 10));
        const initialStatus =
          selectedDate < currentDate &&
          selectedDate.toDateString() !== currentDate.toDateString()
            ? 1
            : 2;

        setFormData({
          ...formData,
          id_room: data.room._id,
          id_movie: data.screening.id_movie,
          time_start: data.screening.time_start,
          date: data.screening.date.slice(0, 10),
          showtype: data.screening.showtype,
          price: data.screening.price,
          id_cinema: data.room.id_cinema,
          status: initialStatus,
        });
      } catch (error) {
        console.error("Failed to fetch screening detail", error);
      } finally {
        setLoading(false);
      }
    };

    getScreengDetail(id);
  }, [id]);

  const handleUpdateScreening = async (id: string) => {
    try {
      const sure = await confirm({
        title: "Bạn có muốn cập nhật suất này?",
        content: "Hành động này sẽ không thể hoàn tác",
      });
      if (sure) {
        await dispatch(updateScreen({ id, data: formData })).unwrap();
        toast.success("Cập nhật suất thành công!");
        await dispatch(
          fetchScreen({
            page: currentPage,
            limit: rowsPerPage,
            date: filter.date,
            movie: filter.movie,
            showtype: filter.showtype,
            status: filter.status,
            timeEnd: filter.timeEnd,
            timeStart: filter.timeStart,
          })
        );
        closeForm();
      } else {
        return;
      }
    } catch (err) {
      toast.error(`Cập nhật suất thất bại: ${err}`);
      console.error(err);
    }
  };

  if (loading) return <p className="text-center p-5">Đang tải...</p>;
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
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={() => handleUpdateScreening(id)}>
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
