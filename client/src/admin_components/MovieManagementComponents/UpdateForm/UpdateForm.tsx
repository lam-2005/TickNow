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
import { useConfirm } from "@/hooks/contexts/useConfirm";

type Props = {
  data: MovieType;
  onSubmit: (data: MovieReq) => void;
  onCancel: () => void;
  genre: Genre[];
};

const UpdateForm = ({ data, onCancel, genre }: Props) => {
  const [loading, setLoading] = useState(false); // trạng thái loading
  const dispatch = useDispatch<AppDispatch>();
  const confirm = useConfirm();
  const listOptionGenre: GenreType[] = genre.map((item) => {
    return {
      label: item.name,
      id: String(item._id),
    };
  });
  const { currentPage, filter } = useSelector(dataMovie);
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
    image: data.image || null,
    banner: data.banner || null,
    description: data.description,
  });

  const handleSubmit = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.release_date ||
      !formData.duration ||
      !formData.age ||
      !formData.genre ||
      !formData.trailer ||
      !formData.image ||
      !formData.banner ||
      !formData.director
    ) {
      toast.warning("Vui lòng nhập đầy đủ và đúng thông tin bắt buộc!");
      return;
    }

    const confirmAdd = await confirm({
      title: "Bạn có muốn cập nhật phim này?",
      content: "Hành động này sẽ không thể hoàn tác",
    });
    if (!confirmAdd) return;
    setLoading(true); // cho nó load
    try {
      await dispatch(
        updateMovie({
          id,
          data: formData,
        })
      ).unwrap();

      toast.success("Cập nhật phim thành công!");
      await dispatch(
        fetchMovies({
          page: currentPage,
          limit: rowsPerPage,
          date: filter.date,
          genre: filter.genre,
          star: filter.star,
          status: filter.status,
        })
      );
      onCancel();
    } catch (err) {
      console.error("Lỗi Cập nhật phim:", err);
      toast.error(`Cập nhật phim thất bại: ${err}`);
    } finally {
      setLoading(false); // dừng load
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
          className="btn  disabled:brightness-70 bg-success text-white"
          disabled={loading} // loading = true thì vô hiệu nút
        >
          {loading ? "Đang xử lí.." : "Cập nhật Phim"}
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
