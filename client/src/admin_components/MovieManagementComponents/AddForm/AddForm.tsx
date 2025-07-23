"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { addMovie, fetchMovies } from "@/utils/redux/slices/movieSlice";
import { MovieReq } from "@/interfaces/movie.interface";
import { toast } from "react-toastify";
import InputGroup from "./InputGroup";
import Genre from "@/interfaces/genre.interface";
import { useConfirm } from "@/hooks/contexts/useConfirm";
import dataMovie from "@/utils/redux/selectors/movieSlector";

type AddFormProps = {
  genre: Genre[];
};
export type GenreType = {
  label: string;
  id: string;
};
const AddForm = ({ genre }: AddFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataMovie);
  const confirm = useConfirm();
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<MovieReq>({
    name: "",
    release_date: "",
    nation: "",
    language: "",
    duration: "",
    age: "",
    director: "",
    actor: "",
    genre: [],
    trailer: "",
    image: null,
    banner: null,
    description: "",
  });
  useEffect(() => {
    if (formData.release_date) {
      const currentDate = new Date();
      const releaseDate = new Date(formData.release_date);

      if (
        releaseDate.getFullYear() < currentDate.getFullYear() ||
        (releaseDate.getFullYear() === currentDate.getFullYear() &&
          releaseDate.getMonth() < currentDate.getMonth()) ||
        (releaseDate.getFullYear() === currentDate.getFullYear() &&
          releaseDate.getMonth() === currentDate.getMonth() &&
          releaseDate.getDate() < currentDate.getDate())
      ) {
        setError("Ngày công chiếu không được trước ngày hiện tại.");
      } else {
        setError("");
      }
    }
  }, [formData.release_date]);
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
      !formData.duration ||
      !formData.age ||
      !formData.genre ||
      !formData.trailer ||
      error ||
      !formData.image ||
      !formData.banner ||
      !formData.director
    ) {
      toast.warning("Vui lòng nhập đầy đủ và đúng thông tin bắt buộc!");
      return;
    }

    const confirmAdd = await confirm({
      title: "Bạn có muốn thêm phim này?",
      content: "Hành động này sẽ không thể hoàn tác",
    });
    if (!confirmAdd) return;

    try {
      await dispatch(
        addMovie({ ...formData, duration: Number(formData.duration) })
      ).unwrap();

      await dispatch(
        fetchMovies({
          page: 1,
          limit: 5,
          date: filter.date,
          genre: filter.genre,
          star: filter.star,
          status: filter.status,
        })
      ).unwrap();
      toast.success("Thêm phim thành công!");

      // Reset form
      setFormData({
        name: "",
        release_date: "",
        nation: "",
        language: "",
        duration: "",
        age: "",
        director: "",
        actor: "",
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
          error={error}
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
