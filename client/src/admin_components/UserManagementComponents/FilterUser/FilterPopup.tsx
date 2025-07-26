import React, { useEffect, useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchUsers, setFilter } from "@/utils/redux/slices/userSlice";
import dataUser from "@/utils/redux/selectors/userSelector";

const FilterItem = ({
  title,
  className,
  onClick,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
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

  useEffect(() => {
    setStatus(filter.status ? filter.status.split(",") : []);
    setRole(filter.role || "");
  }, [filter]);

  const toggleStatus = (value: string) => {
    setStatus((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleFilter = () => {
    const statusStr = status.join(",");
    dispatch(
      fetchUsers({
        page: 1,
        limit: 10,
        status: statusStr,
        role,
      })
    );
    dispatch(
      setFilter({
        status: statusStr,
        role,
      })
    );
    closeForm();
  };
  const handleReset = () => {
    setStatus([]);
    setRole("");
  };
  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Hoạt động", value: "true" },
              { label: "Ngưng hoạt động", value: "false" },
            ].map((item) => (
              <FilterItem
                key={item.value}
                title={item.label}
                onClick={() => toggleStatus(item.value)}
                className={
                  status.includes(item.value)
                    ? "bg-primary text-white border-transparent"
                    : ""
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
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

      <div className="flex justify-end gap-4 p-5 w-full bg-background-card rounded-2xl">
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
