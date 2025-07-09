import React, { useEffect, useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchUsers, setFilter } from "@/utils/redux/slices/userSlice";
import dataUser from "@/utils/redux/selectors/userSelector";

const FilterItem = ({ title, className }: { title: string; className?: string }) => (
  <div
    className={`border-1 border-foreground text-foreground flex-center w-fit px-2 py-1 transition-colors rounded-md hover:bg-primary hover:text-white hover:border-transparent cursor-pointer ${className}`}
  >
    {title}
  </div>
);

const FilterPopup = ({ closeForm }: { closeForm: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataUser);

  const [status, setStatus] = useState<string[]>([]);
  const [role, setRole] = useState<string>("");

  const handleGetStatus = (value: string) => {
    setStatus((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    setStatus(filter.status ? filter.status.split(",") : []);
    setRole(filter.role ?? "");
  }, [filter]);

  const handleFilter = () => {
    dispatch(
      fetchUsers({
        page: 1,
        limit: 10,
        status: status.join(","), // ví dụ: "true,false"
        role,
      })
    );
    dispatch(
      setFilter({
        status: status.join(","),
        role,
      })
    );
    closeForm();
  };

  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Hoạt động", value: "true" },
              { label: "Ngưng hoạt động", value: "false" },
            ].map((s) => (
              <button key={s.value} onClick={() => handleGetStatus(s.value)}>
                <FilterItem
                  title={s.label}
                  className={`${status.includes(s.value) ? "bg-primary text-white border-transparent" : ""}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Vai trò:</h1>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-fit"
          >
            <option value="">-- Tất cả --</option>
            <option value="true">Admin</option>
            <option value="false">Người dùng</option>
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
