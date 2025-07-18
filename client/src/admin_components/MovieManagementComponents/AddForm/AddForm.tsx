"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { addMovie, fetchMovies } from "@/utils/redux/slices/movieSlice";
import { MovieReq } from "@/interfaces/movie.interface";
import { toast } from "react-toastify";
import InputGroup from "./InputGroup";
import Genre from "@/interfaces/genre.interface";

type AddFormProps = {
  genre: Genre[];
};
export type GenreType = {
  label: string;
  id: string;
};
const AddForm = ({ genre }: AddFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<MovieReq>({
    name: "",
    release_date: "",
    nation: "",
    language: 1, // 1: Phụ Đề, 2: Lồng Tiếng
    duration: "",
    age: "",
    director: "",
    actor: "",
    status: 1,
    genre: [],
    trailer: "",
    image: null,
    banner: null,
    description: "",
  });

  const listOptionGenre: GenreType[] = genre.map((item) => {
    return {
      label: item.name,
      id: String(item._id),
    };
  });
  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
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

    const confirmAdd = confirm("Bạn có muốn thêm phim này?");
    if (!confirmAdd) return;

    try {
      await dispatch(
        addMovie({ ...formData, duration: Number(formData.duration) })
      ).unwrap();

      await dispatch(fetchMovies({ page: 1, limit: 5 }));
      toast.success("Thêm phim thành công!");

      // Reset form
      setFormData({
        name: "",
        release_date: "",
        nation: "",
        language: 1,
        duration: "",
        age: "",
        director: "",
        actor: "",
        status: 1,
        genre: [],
        trailer: "",
        image: null,
        banner: null,
        description: "",
      });
    } catch (err) {
      console.error("Lỗi thêm phim:", err);
      toast.error("Thêm phim thất bại!");
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
          listOptionGenre={listOptionGenre}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleAddMovie}>
          Thêm phim
        </button>
      </div>
    </>
  );
};

export default AddForm;
