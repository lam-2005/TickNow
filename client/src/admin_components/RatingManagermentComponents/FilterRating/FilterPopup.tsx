"use client";
import React, { useEffect, useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchRatings, setFilter } from "@/utils/redux/slices/ratingSlice";
import dataRating from "@/utils/redux/selectors/ratingSeletor";

const RatingFilterPopup = ({
  closeForm,
  movies,
}: {
  closeForm: () => void;
  movies: { id: string; name: string }[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataRating);
  const [score, setScore] = useState("");
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setScore(filter.score || "");
    setMovie(filter.movie || "");
    setDate(filter.date || "");
  }, [filter]);

  const handleFilter = () => {
    dispatch(
      fetchRatings({
        page: 1,
        limit: 5,
        score,
        movie,
        date,
      })
    );
    dispatch(
      setFilter({
        score,
        movie,
        date,
      })
    );
    closeForm();
  };

  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn phim:</h1>
          <select
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-fit"
          >
            <option value="">-- Tất cả --</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn đánh giá:</h1>
          <select
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-fit"
          >
            <option value="">-- Tất cả --</option>
            <option value="0,3">Dưới 3 sao</option>
            <option value="3,4">Từ 3 đến 4 sao</option>
            <option value="4,5">Từ 4 đến 5 sao</option>
            <option value="5">5 sao</option>
          </select>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Ngày đánh giá:</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-fit"
          />
        </div>
      </div>

      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </PopupContainer>
  );
};

export default RatingFilterPopup;
