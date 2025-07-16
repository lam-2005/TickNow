"use client";
import React, { useState } from "react";
import { MovieReq, MovieType } from "@/interfaces/movie.interface";
import InputGroup from "./InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { GenreType } from "../AddForm/AddForm";
import Genre from "@/interfaces/genre.interface";
import { toast } from "react-toastify";
import { fetchMovies, updateMovie } from "@/utils/redux/slices/movieSlice";
import dataMovie from "@/utils/redux/selectors/movieSlector";
import usePanigation from "@/hooks/usePanigation";

type Props = {
  data: MovieType;
  onSubmit: (data: MovieReq) => void;
  onCancel: () => void;
  genre: Genre[];
};

const UpdateForm = ({ data, onCancel, genre }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const listOptionGenre: GenreType[] = genre.map((item) => {
    return {
      label: item.name,
      id: String(item._id),
    };
  });
  const { currentPage } = useSelector(dataMovie);
  const { rowsPerPage } = usePanigation(currentPage);

  const date = new Date(data.release_date);
  const formatted = date.toISOString().split("T")[0];
  const [formData, setFormData] = useState<MovieReq>({
    name: data.name,
    release_date: formatted,
    nation: data.nation,
    language: data.language,
    duration: data.duration,
    age: data.age,
    director: data.director,
    actor: data.actor,
    status: data.status,
    genre: [...data.genre.map((item) => String(item.id))],
    trailer: data.trailer,
    image: null,
    banner: null,
    description: data.description,
  });

  const handleSubmit = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.release_date ||
      !formData.status ||
      !formData.duration ||
      !formData.age ||
      !formData.genre ||
      !formData.trailer
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }
    const confirmAdd = confirm("Bạn có muốn cập nhật phim này?");
    if (!confirmAdd) return;
    try {
      await dispatch(
        updateMovie({
          id,
          data: { ...formData, duration: Number(formData.duration) },
        })
      ).unwrap();

      toast.success("Cập nhật phim thành công!");
      await dispatch(fetchMovies({ page: currentPage, limit: rowsPerPage }));
      onCancel();
    } catch (err) {
      console.error("Lỗi Cập nhật phim:", err);
      toast.error("Cập nhật phim thất bại!");
    }
  };

  return (
    <form className="flex flex-col w-3.5xl h-full overflow-y-auto">
      <div className="flex-1 overflow-y-auto px-5">
        <InputGroup
          listOptionGenre={listOptionGenre}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="flex justify-end gap-2 p-5 bg-background-card rounded-b-xl">
        <button
          onClick={(e) => {
            handleSubmit(data._id, e);
          }}
          className="btn bg-success text-white"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
