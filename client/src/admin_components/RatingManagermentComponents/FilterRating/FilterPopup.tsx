"use client";
import React, { useEffect, useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchRatings, setFilter } from "@/utils/redux/slices/ratingSlice";
import dataRating from "@/utils/redux/selectors/ratingSeletor";
import { Autocomplete, TextField } from "@mui/material";

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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [error, setError] = useState(""); // kiểm lỗi

  useEffect(() => {
    setError("");

    if (fromDate && toDate) {
      const current = new Date(fromDate);
      const end = new Date(toDate);
      if (current > end) {
        setError("Ngày bắt đầu không được lớn hơn ngày kết thúc");
        return;
      }
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    setScore(filter.score || "");
    setMovie(filter.movie || "");
    setFromDate(filter.start_day || "");
    setToDate(filter.end_day || "");
  }, [filter]);

  const handleFilter = () => {
    dispatch(
      fetchRatings({
        page: 1,
        limit: 5,
        score,
        movie,
        start_day: fromDate,
        end_day: toDate,
      })
    );
    dispatch(
      setFilter({
        score,
        movie,
        start_day: fromDate,
        end_day: toDate,
      })
    );
    closeForm();
  };
  const handleReset = () => {
    setScore("");
    setMovie("");
    setFromDate("");
    setToDate("");
  };
  const handleMovieChange = (value: { id: string; name: string } | null) => {
    setMovie(value ? value.id : "");
  };
  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn phim:</h1>
          <Autocomplete
            id="checkboxes-tags-demo"
            className="w-full"
            options={movies}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            value={movies.find((option) => option.id === movie) || null}
            onChange={(_, values) => handleMovieChange(values)}
            renderInput={(params) => (
              <TextField {...params} label="Chọn Phim" placeholder="Phim" />
            )}
          />
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
          <div className="flex gap-10">
            <TextField
              className="w-full"
              type="date"
              required
              error={error ? true : false}
              helperText={error}
              id="outlined-required"
              label="Từ"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="Nhập ngày bắt đầu"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                onClick: (e) => {
                  // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
                  (e.currentTarget as HTMLInputElement).showPicker?.();
                },
              }}
            />

            <TextField
              className="w-full"
              type="date"
              required
              id="outlined-required"
              error={error ? true : false}
              label="Đến"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="Nhập ngày kết thúc"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                onClick: (e) => {
                  // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
                  (e.currentTarget as HTMLInputElement).showPicker?.();
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end p-5 w-full gap-4 bg-background-card rounded-2xl">
        <button
          className="btn border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
          onClick={handleReset}
        >
          Đặt lại bộ lọc
        </button>
        <button className="btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </PopupContainer>
  );
};

export default RatingFilterPopup;
