import React, { useEffect, useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import Genre from "@/interfaces/genre.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchMovies, setFilter } from "@/utils/redux/slices/movieSlice";
import dataMovie from "@/utils/redux/selectors/movieSlector";

const FilterItem = ({
  title,
  className,
  onClick,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`border-1 border-foreground text-foreground flex-center w-fit px-2 py-1 transition-colors rounded-md hover:bg-primary hover:text-white hover:border-transparent cursor-pointer ${className}`}
    >
      {title}
    </div>
  );
};

const FilterPopup = ({
  closeForm,
  data,
}: {
  closeForm: () => void;
  data: Genre[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataMovie);

  const [idGenres, setIdGenres] = useState<string[]>([]);
  const [status, setStatus] = useState<number[]>([]);
  const [date, setDate] = useState<string>("");
  const [star, setStar] = useState<string>("");

  useEffect(() => {
    const safeGenre = (() => {
      if (typeof filter.genre === "string") {
        return filter.genre.split(",");
      }
      return [];
    })();

    const safeStatus = (() => {
      if (typeof filter.status === "string") {
        return filter.status.split(",").map(Number);
      }
      return [];
    })();
    setIdGenres(safeGenre);
    setStatus(safeStatus);
    setDate(filter.date || "");
    setStar(filter.star || "");
  }, [filter]);

  const handleToggleGenre = (id: string) => {
    setIdGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleToggleStatus = (id: number) => {
    setStatus((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleFilter = () => {
    dispatch(
      fetchMovies({
        limit: 5,
        page: 1,
        genre: idGenres.join(","),
        status: status.join(","),
        date,
        star,
      })
    );
    dispatch(
      setFilter({
        genre: idGenres.join(","),
        status: status.join(","),
        date,
        star,
      })
    );
    closeForm();
  };

  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Chọn thể loại:</h1>
          <div className="flex flex-wrap gap-4">
            {data.map((genre) => (
              <FilterItem
                key={genre._id}
                title={genre.name}
                onClick={() => handleToggleGenre(genre._id.toString())}
                className={
                  idGenres.includes(genre._id.toString())
                    ? "bg-primary text-white border-transparent"
                    : ""
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((stt) => (
              <FilterItem
                key={stt}
                title={
                  stt === 1
                    ? "Đang chiếu"
                    : stt === 2
                    ? "Sắp chiếu"
                    : "Ngưng chiếu"
                }
                onClick={() => handleToggleStatus(stt)}
                className={
                  status.includes(stt)
                    ? "bg-primary text-white border-transparent"
                    : ""
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Chọn ngày chiếu:</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-fit"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Chọn đánh giá:</h1>
          <select
            value={star}
            onChange={(e) => setStar(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-fit"
          >
            <option value="">-- Tất cả --</option>
            <option value="0,3">Dưới 3 sao</option>
            <option value="3,4">Từ 3 đến 4 sao</option>
            <option value="4,5">Từ 4 đến 5 sao</option>
            <option value="5">5 sao</option>
          </select>
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

export default FilterPopup;
