import { ScreenReq } from "@/interfaces/screening.interface";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { MovieOptionsType } from "./AddForm";
import { RoomType } from "@/interfaces/room.interface";
import { groupCinemasWithRooms } from "../handleGetRoomId";
type InputGroupProps = {
  formData: ScreenReq;
  setFormData: (data: ScreenReq) => void;
  listOptionMovies: MovieOptionsType[];
  listOptionRooms: RoomType[];
};

const InputGroup = ({
  formData,
  setFormData,
  listOptionMovies,
  listOptionRooms,
}: InputGroupProps) => {
  const getCinema = groupCinemasWithRooms(listOptionRooms);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  // Tìm phòng theo rạp được chọn
  const selectedCinema = getCinema.find(
    (cinema) => cinema.id_cinema === selectedCinemaId
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-3xl gap-4">
      <div>
        <label className="block mb-1 text-sm font-medium">
          Chọn phim <span className="text-red-500">*</span>
        </label>
        {/* đây là select option chọn nhiều cứ copy rồi làm theo là đc */}
        <Autocomplete
          disablePortal
          options={listOptionMovies} // dữ liệu select/option đã được thay đỏi từ cái movie mình fectch về ở pagetsx
          size="small"
          className="min-w-[300px]"
          getOptionLabel={(option) => option.label} //dùng để hiển thị ui (nhớ lấy đúng với dữ liệu MovieOptionsType )
          isOptionEqualToValue={(option, value) => option.id === value.id} //dùng để lấy giá trị để gửi đi (nhớ lấy đúng với dữ liệu MovieOptionsType )
          value={
            listOptionMovies.find((c) => c.id === formData.id_movie) || null
          } // cứ làm theo này là đc k biết thì nt hỏi
          onChange={(event, newValue) => {
            setFormData({
              ...formData,
              id_movie: newValue ? newValue.id : "",
            });
          }}
          renderInput={(params) => <TextField {...params} label="Chọn phim" />}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Thời gian bắt đầu <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          placeholder="Thời gian bắt đầu"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.time_start}
          onChange={(e) =>
            setFormData({ ...formData, time_start: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Ngày chiếu<span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          placeholder="Ngày chiếu"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Kiểu chiếu <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.showtype}
          onChange={(e) =>
            setFormData({ ...formData, showtype: e.target.value })
          }
        >
          <option value={1}>Phụ đề</option>
          <option value={2}>Lồng tiếng</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Giá (VNĐ) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Nhập giá"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">
          Chọn rạp <span className="text-red-500">*</span>
        </label>
        <select
          // select/option chọn 1
          value={selectedCinemaId}
          onChange={(e) => {
            setSelectedCinemaId(e.target.value);
            setFormData({ ...formData, id_room: "" });
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Chọn rạp --</option>
          {getCinema.map((cinema) => (
            <option key={cinema.id_cinema} value={cinema.id_cinema}>
              {cinema.cinema_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Chọn phòng <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.id_room}
          onChange={(e) =>
            setFormData({ ...formData, id_room: e.target.value })
          }
          className="border p-2 rounded w-full"
          disabled={!selectedCinema}
        >
          <option value="">-- Chọn phòng --</option>
          {selectedCinema &&
            selectedCinema.rooms.map((room) => (
              <option key={room._id} value={room._id}>
                Phòng {room.code_room}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default InputGroup;
