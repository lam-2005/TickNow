"use client";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { AppDispatch } from "@/utils/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../Button/ButtonActions";
import { PostType } from "@/interfaces/post.interface";
import postSelector from "@/utils/redux/selectors/postSelector";
import {
  deletePost,
  fetchPosts,
  setInitialPost,
} from "@/utils/redux/slices/postSlice";
import Status from "../StatusUI/Status";
import { toast } from "react-toastify";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import DetailPost from "./DetailPost/DetailPost";
import { Voucher } from "@/interfaces/vouchers.interface";
type InitDataType = {
  posts: PostType[];
  total: number;
  currentPage: number;
  totalPages: number;
};
const PostList = ({
  initData,
  voucherList,
}: {
  initData: InitDataType;
  voucherList: Voucher[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [idPost, setIdPost] = useState("");
  const vouchers = voucherList.map((voucher) => voucher.code);
  // lay selector
  const { currentPage, loading, data, error, total, totalPages, filter } =
    useSelector(postSelector);
  // hook phan trang
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );
  useEffect(() => {
    dispatch(setInitialPost(initData));
  }, [dispatch, initData]);
  // render
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    dispatch(fetchPosts({ limit: rowsPerPage, page, title: filter.title }));
  }, [dispatch, rowsPerPage, page]);

  // table
  const col: Column<PostType>[] = [
    { key: "title", title: "Tiêu đề" },
    {
      key: "content",
      title: "Nội dung",
      render(row) {
        return (
          <div
            onClick={() => handleOpenShowInfo(row._id)}
            className="line-clamp-2 hover:underline cursor-pointer"
            dangerouslySetInnerHTML={{ __html: row.content }}
          />
        );
      },
    },

    {
      key: "status",
      title: "Trạng thái",
      render(row) {
        return (
          <Status
            color={row.status === 1 ? "error" : "success"}
            title={row.status === 1 ? "Không hoạt động" : "Hoạt động"}
          />
        );
      },
    },
    {
      title: "Thao tác",
      render(row) {
        return (
          <div className="flex gap-3">
            <ActionButton
              label="Sửa"
              bgColor="warning"
              onClick={() => handleOpenUpdate(row._id)}
            />
            <ActionButton
              label="Xóa"
              bgColor="error"
              onClick={() => handleDeletePost(row._id)}
            />
          </div>
        );
      },
    },
  ];
  const handleDeletePost = async (id: string) => {
    try {
      const sure = confirm("Bạn có muốn xóa bài viết này?");
      if (sure) {
        await dispatch(deletePost(id));
        await dispatch(
          fetchPosts({
            page: currentPage,
            limit: rowsPerPage,
            title: filter.title,
          })
        );
        toast.success("Xóa bài viết thành công");
      } else return;
    } catch (error) {
      toast.error(`Xóa thất bại: ${error}`);
    }
  };
  const handleOpenShowInfo = async (id: string) => {
    setIdPost(id);
    setShowInfo(true);
  };
  const handleOpenUpdate = async (id: string) => {
    setIdPost(id);
    setOpenUpdateForm(true);
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {showInfo && idPost && (
        <DetailPost id={idPost} closeForm={() => setShowInfo(false)} />
      )}
      {openUpdateForm && idPost && (
        <UpdateFormContainer
          voucherList={vouchers}
          id={idPost}
          closeForm={() => setOpenUpdateForm(false)}
        />
      )}
      {
        <Table
          column={col}
          data={data}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
        />
      }
      {total > rowsPerPage && (
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
