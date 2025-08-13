import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { setFilter } from "@/utils/redux/slices/roomSlice";
import PopupContainer from "@/admin_components/PopupContainer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { MovieType } from "@/interfaces/movie.interface";
import { toast } from "react-toastify";
import dataTicket from "@/utils/redux/selectors/ticketSelector";
import { fetchTicket } from "@/utils/redux/slices/ticketSlice";
import { MovieOptionsType } from "@/admin_components/ScreenManagementComponents/AddForm/AddForm";
import { getTicketList } from "@/services/ticket.service";
import { Ticket } from "@/interfaces/ticket.interface";

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
  const listOptionMovies: MovieOptionsType[] = movies.map((item) => {
    // dữ liệu select/option
    return {
      label: item.name,
      id: item._id,
    };
  });
  const [idShowtime, setIdShowtime] = useState("");
  const [idMovies, setIdMovie] = useState<string>(""); // nếu lọc nhiêu thì [] con 1 thì cứ ""
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [error, setError] = useState(""); // kiểm lỗi
  const [listShowtime, setListShowtime] = useState<Ticket[]>([]);
  const [pendingListShowtime, setPendingListShowtime] = useState(false);
  useEffect(() => {
    const getListShowtime = async () => {
      setPendingListShowtime(true);
      setListShowtime([]);
      // setIdShowtime("");
      if (dateRange.length === 0) return;
      try {
        const res = await getTicketList(`?date=${dateRange.join(",")}`);
        const result = res?.data.tickets;
        const newList: Ticket[] = result
          .reduce((acc: Ticket[], cur: Ticket) => {
            function getDateOnly(dateStr: string) {
              return new Date(dateStr).toLocaleDateString("vn-vi");
            }

            if (
              !acc.some(
                (i) =>
                  i.id_screening === cur.id_screening &&
                  getDateOnly(i.updatedAt as string) ===
                    getDateOnly(cur.updatedAt as string)
              )
            )
              acc.push(cur);
            return acc;
          }, [])
          .sort((a: Ticket, b: Ticket) => {
            // So sánh theo ngày updatedAt
            const dateA = new Date(a.updatedAt as string).setHours(0, 0, 0, 0);
            const dateB = new Date(b.updatedAt as string).setHours(0, 0, 0, 0);
            if (dateA !== dateB) return dateA - dateB;

            // 2️⃣ Ngày giống nhau → so theo giờ chiếu screeningTime
            const [hourA, minA] = a.screeningTime.split(":").map(Number);
            const [hourB, minB] = b.screeningTime.split(":").map(Number);
            return hourA - hourB || minA - minB;
          });

        setListShowtime(newList);
      } catch (error) {
        console.error("Loi lay du lieu", error);
      } finally {
        setPendingListShowtime(false);
      }
    };
    getListShowtime();
  }, [dateRange]);
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

  const handleMovieChange = (value: MovieOptionsType | null) => {
    setIdMovie(value ? value.id : "");
  };
  const handleShowtimeChange = (value: Ticket | null) => {
    setIdShowtime(value ? value.id_screening : "");
  };
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataTicket);
  const handleGetStatus = (id: number) => {
    setType((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    ); // cái lọc nhiều trạng thái
  };

  useEffect(() => {
    setIdMovie(filter.movieId || "");
    setIdShowtime(filter.screening || "");
    setType(
      filter.type
        ? filter.type
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
            .map(Number)
        : []
    );

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
  }, [filter]);

  const handleFilter = () => {
    if (error) {
      toast.error(error);
      return;
    }

    dispatch(
      fetchTicket({
        limit: 5,
        page: 1,
        movieId: idMovies,
        type: type.join(","),
        date: dateRange.join(","),
        screening: idShowtime,
      })
    );
    dispatch(
      setFilter({
        movieId: idMovies,
        type: type.join(","),
        date: dateRange.join(","),
        screening: idShowtime,
      })
    );
    closeForm();
  };
  const handleReset = () => {
    setIdMovie("");
    setType([]);
    setFromDate("");
    setToDate("");
    setDateRange([]);
    setError("");
    setIdShowtime("");
  };

  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5 overflow-hidden overflow-y-auto">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn phim:</h1>
          <div className="flex flex-wrap gap-4">
            <Autocomplete
              id="checkboxes-tags-demo"
              className="w-full"
              options={listOptionMovies}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              value={
                listOptionMovies.find((option) => option.id === idMovies) ||
                null
              }
              onChange={(_, values) => handleMovieChange(values)}
              renderInput={(params) => (
                <TextField {...params} label="Chọn Phim" placeholder="Phim" />
              )}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((stt) => (
              <button key={stt} onClick={() => handleGetStatus(stt)}>
                <FilterItem
                  className={`${
                    type.includes(stt)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                  title={`${
                    stt === 1
                      ? "Thanh toán thất bại"
                      : stt === 2
                      ? "Đã thanh toán"
                      : "Đã hủy"
                  }`}
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
        {dateRange.length > 0 && (
          <div className="flex gap-4 flex-col">
            <h1 className="text-xl font-bold">Chọn suất:</h1>
            <div className="flex flex-wrap gap-4">
              <Autocomplete
                id="checkboxes-tags-demo"
                className="w-full"
                options={listShowtime}
                loading={pendingListShowtime}
                disableCloseOnSelect
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                getOptionLabel={(option) => {
                  const date = new Date(
                    option.updatedAt as string
                  ).toLocaleDateString("vi-vn", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  return `${date}, ${option.screeningTime} - ${option.movie}`;
                }}
                value={
                  listShowtime.find(
                    (option) => option.id_screening === idShowtime
                  ) || null
                }
                renderOption={(props, option) => {
                  const date = new Date(
                    option.updatedAt as string
                  ).toLocaleDateString("vi-vn", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  return (
                    <li {...props} key={option._id}>
                      {`${date}, ${option.screeningTime} - ${option.movie}`}
                    </li>
                  );
                }}
                onChange={(_, values) => handleShowtimeChange(values)}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn Suất" placeholder="Suất" />
                )}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl gap-4">
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
