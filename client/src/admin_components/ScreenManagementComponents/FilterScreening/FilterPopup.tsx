import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { setFilter } from "@/utils/redux/slices/roomSlice";
import PopupContainer from "@/admin_components/PopupContainer";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { MovieType } from "@/interfaces/movie.interface";
import { MovieOptionsType } from "../AddForm/AddForm";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import dataScreen from "@/utils/redux/selectors/screenSelector";
import { fetchScreen } from "@/utils/redux/slices/screenSlice";
import { toast } from "react-toastify";

const FilterItem = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`border-1 border-foreground text-foreground flex-center w-fit px-2 py-1 transition-colors rounded-md hover:bg-primary hover:text-white hover:border-transparent cursor-pointer ${className}`}
    >
      {title}
    </div>
  );
};
const FilterPopup = ({
  movies,
  closeForm,
}: // data,
{
  movies: MovieType[];
  closeForm: () => void;
  // data: Cinema[];
}) => {
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const listOptionMovies: MovieOptionsType[] = movies.map((item) => {
    // dữ liệu select/option
    return {
      label: item.name,
      id: item._id,
    };
  });
  const [idMovies, setIdMovie] = useState<string[]>([]); // nếu lọc nhiêu thì [] con 1 thì cứ ""
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState<number[]>([]);
  const [showtype, setShowtype] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [error, setError] = useState(""); // kiểm lỗi

  useEffect(() => {
    setError("");

    if (fromDate && toDate) {
      if (fromDate > toDate) {
        setError("Ngày bắt đầu không được lớn hơn ngày kết thúc");
        setDateRange([]);
        return;
      }
      const range: string[] = [];
      const current = new Date(fromDate);
      const end = new Date(toDate);

      while (current <= end) {
        range.push(current.toISOString().slice(0, 10));
        current.setDate(current.getDate() + 1);
      }

      setDateRange(range);
    } else {
      const result = [];
      if (fromDate) result.push(fromDate);
      if (toDate) result.push(toDate);
      setDateRange(result);
    }
  }, [fromDate, toDate]);

  const handleMovieChange = (values: MovieOptionsType[]) => {
    const ids = values.map((item) => item.id);
    setIdMovie(ids);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataScreen);
  const handleGetStatus = (id: number) => {
    setStatus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    ); // cái lọc nhiều trạng thái
  };
  const handleGetShơtype = (id: number) => {
    setShowtype((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    // khi web vừa load
    if (filter.movie) {
      //nếu có lọc (filter lấy từ selector)
      setIdMovie(filter.movie.split(",")); // dữ liệu của filter lấy từ selector là dạng chuỗi có nên là tách tnahfh dạng mảng
    } else {
      setIdMovie([]);
    }
    //status
    if (filter.status) {
      setStatus(filter.status.split(",").map((s) => Number(s)));
    } else {
      setStatus([]);
    }
    //showtype
    if (filter.showtype) {
      setShowtype(filter.showtype.split(",").map((s) => Number(s)));
    } else {
      setShowtype([]);
    }
    //date
    if (filter.date) {
      const dates = filter.date.split(",");
      setDateRange(dates);
      // nếu filter.date có 1 giá trị => gán vào fromDate hoặc toDate tùy
      if (dates.length === 1) {
        setFromDate(dates[0]);
        setToDate("");
      } else if (dates.length >= 2) {
        setFromDate(dates[0]);
        setToDate(dates[dates.length - 1]);
      } else {
        setFromDate("");
        setToDate("");
      }
    } else {
      setDateRange([]);
      setFromDate("");
      setToDate("");
    }
    setTimeStart(filter.timeStart || "");
    setTimeEnd(filter.timeEnd || "");
  }, [filter]);

  const handleFilter = () => {
    if (error) {
      toast.error(error);
      return;
    }

    dispatch(
      fetchScreen({
        limit: 5,
        page: 1,
        movie: idMovies.join(","), // chuyển mảng thành chuỗi
        status: status.join(","),
        date: dateRange.join(","),
        showtype: showtype.join(","),
        timeEnd: timeEnd,
        timeStart: timeStart,
      })
    );
    dispatch(
      setFilter({
        movie: idMovies.join(","),
        status: status.join(","),
        date: dateRange.join(","),
        showtype: showtype.join(","),
        timeEnd: timeEnd,
        timeStart: timeStart,
      })
    );
    closeForm();
  };
  const handleReset = () => {
    setIdMovie([]);
    setStatus([]);
    setShowtype([]);
    setFromDate("");
    setToDate("");
    setDateRange([]);
    setError("");
    setTimeStart("");
    setTimeEnd("");
  };
  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5 overflow-hidden overflow-y-auto">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn phim:</h1>
          <div className="flex flex-wrap gap-4">
            <Autocomplete
              // lọc chiều có checkboxes
              multiple
              id="checkboxes-tags-demo"
              className="w-full"
              options={listOptionMovies}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              value={listOptionMovies.filter((option) =>
                idMovies.includes(option.id)
              )}
              onChange={(_, values) => handleMovieChange(values)}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn Phim" placeholder="Phim" />
              )}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {[1, 2].map((stt) => (
              <button key={stt} onClick={() => handleGetStatus(stt)}>
                <FilterItem
                  className={`${
                    status.includes(stt)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                  title={`${stt === 1 ? "Không hoạt động" : "Hoạt động"}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn kiểu chiếu:</h1>
          <div className="flex flex-wrap gap-4">
            {[1, 2].map((stt) => (
              <button key={stt} onClick={() => handleGetShơtype(stt)}>
                <FilterItem
                  className={`${
                    showtype.includes(stt)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                  title={`${stt === 1 ? "Phụ đề" : "Lồng tiếng"}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn ngày chiếu: </h1>
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
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn giờ chiếu:</h1>
          <div className="flex gap-10">
            <div className="flex items-start gap-2">
              <label htmlFor="" className="text-lg font-bold">
                Giờ bắt đầu:
              </label>
              <input
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="border border-foreground p-2"
              />
            </div>
            <div className="flex items-start gap-2">
              <label htmlFor="" className="text-lg font-bold">
                Giờ kết thúc:
              </label>
              <input
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="border border-foreground p-2"
              />
            </div>
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

export default FilterPopup;
