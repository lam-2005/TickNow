"use client";
import React, { useEffect, useState } from "react";
import PopupContainer from "../PopupContainer";
import { Post } from "@/interfaces/post.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchPosts, setFilter } from "@/utils/redux/slices/postSlice";
import postSelector from "@/utils/redux/selectors/selectorPost";
import { getPostList } from "@/services/post.service";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


const FilterItem = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={`border p-2 rounded-md ${className}`}>{title}</div>
  );
};

const FilterPopup = ({
  closeForm,
}: {
  closeForm: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [posts, setPosts] = useState<Post[]>([]);

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [status, setStatus] = useState<number[]>([]);
  const [user, setUser] = useState<string>();

  const { filter } = useSelector(postSelector);

  const handleGetStatus = (value: number) => {
    setStatus((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    getPostList().then(res => {
      setPosts(res?.post ?? [])
    });
  }, [])

  useEffect(() => {
    setStartDate(filter.startDate ?? '')
    setEndDate(filter.endDate ?? '')
    setUser(filter.user ?? '')

    if (filter.status) {
      setStatus(filter.status.split(",").map((s) => Number(s)));
    } else {
      setStatus([]);
    }
  }, [filter]);
  
  const handleFilter = () => {
    dispatch(
      fetchPosts({
        limit: 5,
        page: 1,
        startDate: startDate,
        endDate: endDate,
        status: status.join(","),
        user: user,
      })
    );
    dispatch(
      setFilter({
        startDate: startDate,
        endDate: endDate,
        status: status.join(","),
        user: user,
      })
    );
    closeForm();
  };

  return (
    <PopupContainer title="Bộ lọc bài viết" closeForm={closeForm}>
      <div className="p-5 space-y-5 overflow-y-scroll">

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn user:</h1>
          <div className="flex flex-wrap gap-4">
            {posts?.length > 0 ? (
              posts
              .filter((post, index, self) => index === self.findIndex(v => v.id_user === post.id_user))
              .map((loc) => (
                <button key={loc._id} onClick={() => user == loc.id_user ? setUser("") : setUser(loc.id_user)}>
                  <FilterItem
                    title={loc.id_user}
                    className={`${
                      user === loc.id_user
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu user.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn ngày bắt đầu:</h1>
          <div className="flex flex-wrap gap-4">
            {posts?.length > 0 ? (
              posts
              .filter((post, index, self) => index === self.findIndex(v => formatDate(v.start_day) === formatDate(post.start_day)))
              .map((loc) => (
                <button key={loc._id} onClick={() => startDate == formatDate(loc.start_day) ? setStartDate("") : setStartDate(formatDate(loc.start_day))}>
                  <FilterItem
                    title={formatDate(loc.start_day)}
                    className={`${
                      startDate === formatDate(loc.start_day)
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu ngày bắt đầu.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn ngày kết thúc:</h1>
          <div className="flex flex-wrap gap-4">
            {posts?.length > 0 ? (
              posts
              .filter((post, index, self) => index === self.findIndex(v => formatDate(v.end_day) === formatDate(post.end_day)))
              .map((loc) => (
                <button key={loc._id} onClick={() => endDate == formatDate(loc.end_day) ? setEndDate("") : setEndDate(formatDate(loc.end_day))}>
                  <FilterItem
                    title={formatDate(loc.end_day)}
                    className={`${
                      endDate === formatDate(loc.end_day)
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu ngày kết thúc.</p>
            )}
          </div>
        </div>

        <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
        <div className="flex gap-4 flex-wrap">
          {[1, 2].map((val) => (
            <button key={val} onClick={() => handleGetStatus(val)}>
              <FilterItem
                className={status.includes(val) ? "bg-primary text-white" : ""}
                title={val === 2 ? "Hoạt động" : "Ẩn"}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end p-5">
        <button className="btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </PopupContainer>
  );
};

export default FilterPopup;
