import { ScreenReq } from "@/interfaces/screening.interface";
import React from "react";

type InputGroupProps = {
  formData: ScreenReq;
  setFormData: (data: ScreenReq) => void;
};

const InputGroup = ({ formData, setFormData }: InputGroupProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-3xl gap-4">
      <div>
        <label className="block mb-1 text-sm font-medium">
          Tên phim <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Tên suất chiếu"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.movieName}
          onChange={(e) => setFormData({ ...formData, movieName: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Phòng chiếu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Phòng chiếu"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.roomCode}
          onChange={(e) => setFormData({ ...formData, roomCode: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Thời gian bắt đầu <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          placeholder="Thời gian bắt đầu"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.time_start}
          onChange={(e) => setFormData({ ...formData, time_start: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Thời gian kết thúc <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          placeholder="Thời gian kết thúc"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.time_end}
          onChange={(e) => setFormData({ ...formData, time_end: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Thể loại âm thanh <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.showtype}
          onChange={(e) => setFormData({ ...formData, showtype: e.target.value })}
        >
          <option value="">Lòng tiếng</option>
          <option value="">Thuyết minh</option>
          <option value="">Vietsub</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Trạng thái <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.status ? "true" : "false"}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value === "true" })
          }
        >
          <option value="true">Đang chiếu</option>
          <option value="false">Ngừng chiếu</option>
        </select>
      </div>
    </div>
  );
};

export default InputGroup;
