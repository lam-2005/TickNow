"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchPosts, setFilter } from "@/utils/redux/slices/postSlice";

const SearchPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState("");
  // const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setFilter({ title: searchText }));
      dispatch(fetchPosts({ page: 1, limit: 5, title: searchText }));
    }, 400);

    return () => clearTimeout(handler);
  }, [searchText]);

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm theo tiêu đề..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="min-w-[240px] bg-white border-2 border-border-container py-2 px-2.5 outline-none rounded-[5px] focus:border-primary shadow-primary shadow-[0_0_5px] transition-all duration-300 ease-in-out text-sm"
      />
    </div>
  );
};

export default SearchPost;
