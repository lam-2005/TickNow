"use client";
import React from "react";
import { ScreenReq } from "@/interfaces/screening.interface";

type InputGroupProps = {
  formData: ScreenReq;
  setFormData: (data: ScreenReq) => void;
  onlyEditStatusAndRole?: boolean;
};

const InputGroup = ({ formData, setFormData, onlyEditStatusAndRole }: InputGroupProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-3xl gap-4">
      {!onlyEditStatusAndRole && (
        <>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tên phim <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Tên phim"
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
              value={formData.id_room}
              onChange={(e) => setFormData({ ...formData, id_room: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Thời gian chiếu <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              placeholder="Thời gian chiếu"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.time_start}
              onChange={(e) => setFormData({ ...formData, time_start: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Thời gian ngừng <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              placeholder="Thời than ngừng"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.time_end}
              onChange={(e) => setFormData({ ...formData, time_end: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Ngày chiếu <span className="text-red-500">*</span>
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
              Thể loại âm thanh <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.status ? "true" : "false"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value === "true" })
              }
            >
              <option >Lòng tiếng</option>
              <option >Thuyết minh</option>
              <option >Vietsub</option>
            </select>
          </div>


        </>
      )}
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
          <option value="true">Đang hoạt động</option>
          <option value="false">Ngừng hoạt động</option>
        </select>
      </div>
    </div>
  );
};

export default InputGroup;