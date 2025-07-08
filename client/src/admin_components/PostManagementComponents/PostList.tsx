"use client";

import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { AppDispatch } from "@/utils/redux/store";
import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../Button/ButtonActions";
// import UpdatePostForm from "./UpdatePost/UpdateForm";
import { Post } from "@/interfaces/post.interface";
import { fetchPosts, setInitialPost } from "@/utils/redux/slices/postSlice";
import postSelector from "@/utils/redux/selectors/selectorPost";
import { toast } from "react-toastify";

type InitDataType = {
  posts: Post[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const PostList = ({ initData }: { initData: Promise<InitDataType> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = use(initData);
  const isFirstLoad = useRef(true);

  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>();

  const { data, error, total, currentPage, loading, totalPages, filter } =
    useSelector(postSelector);

  const { page, changePage, changeRowPerPage, rowsPerPage } =
    usePanigation(initialData.currentPage);

  useEffect(() => {
    if (isFirstLoad.current) {
      dispatch(setInitialPost(initialData));
      isFirstLoad.current = false;
      return;
    }

    const fetchPage = page <= totalPages ? page : totalPages;
    dispatch(fetchPosts({ 
      limit: rowsPerPage,
      page: fetchPage,
      startDate: filter.startDate,
      endDate: filter.endDate,
      status: filter.status,
      user: filter.user,
    }));
  }, [dispatch, page, rowsPerPage, totalPages, initialData, filter]);

  const handleOpenUpdate = (id: string) => {
    const post = data.find((p) => p._id === id);
    if (!post) {
      toast.error("Bài viết không tồn tại");
      return;
    }

    setSelectedPost(post);
    setOpenUpdateForm(true);
  };

  // const handleCloseUpdate = () => {
  //   setSelectedPost(null);
  //   setOpenUpdateForm(false);
  //   dispatch(fetchPosts({ limit: rowsPerPage, page: 1 }));
  // };

  const columns: Column<Post>[] = [
    { key: "title", title: "Tiêu đề" },
    {
      key: "content",
      title: "Nội dung",
      render: (row) => (
        <div className="line-clamp-2 max-w-xs">{row.content?.slice(0, 100)}...</div>
      ),
    },
    {
      key: "image",
      title: "Hình ảnh",
      render: (row) =>
        row.image ? (
          <div className="w-20 h-14 border rounded overflow-hidden">
            <img
              src={row.image}
              alt={row.title || "image"}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/80x56?text=No+Image";
              }}
            />
          </div>
        ) : (
          <span>Không có ảnh</span>
        ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (row) => (
        <span className={row.status === 2 ? "text-green-600" : "text-red-500"}>
          {row.status === 2 ? "Hoạt động" : "Ẩn"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      render: (row) => (
        <ActionButton
          bgColor="warning"
          onClick={() => handleOpenUpdate(row._id!)}
          label="Sửa"
        />
      ),
    },
  ];

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;


  return (
    <>
      {/* {openUpdateForm && selectedPost && (
        <UpdatePostForm post={selectedPost} closeForm={handleCloseUpdate} />
      )} */}
      <Table
        column={columns} 
        data={data}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />

      {total >= rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          total={total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      )}
    </>
  );
};

export default PostList;
