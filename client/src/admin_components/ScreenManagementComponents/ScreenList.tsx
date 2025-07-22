"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { Screening } from "@/interfaces/screening.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataScreen from "@/utils/redux/selectors/screenSelector";
import {
  fetchScreen,
  setInitialScreen,
} from "@/utils/redux/slices/screenSlice";
import usePanigation from "@/hooks/usePanigation";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import { MovieType } from "@/interfaces/movie.interface";
import { RoomType } from "@/interfaces/room.interface";
import Status from "../StatusUI/Status";

type InitDataType = {
  //type của dữ liệu render lần dâu (khi lgoij hàm service lấy dữ liệu dặt cho redux hãy log ra xem có gì r viết theo
  Screen: Screening[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const ScreenList = ({
  initData, // dữ liệu render lần đaau khi mới mở web
  moviesOptions, //dùng làm select/option khi làm form add (cái này sẽ là dữ liêu  bên trang page fetch api về )
  rooms, // làm select/option khi làm form add tương tự với cái trên
}: {
  initData: InitDataType;
  moviesOptions: MovieType[];
  rooms: RoomType[];
}) => {
  const dispatch = useDispatch<AppDispatch>(); // hàm dis patch actuion của redux
  const isFirstLoad = useRef(true); // nhận biết khi web load lần đầu để hiển thị dữ liệu render lần đâu
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false); // mở form update
  const [idScreening, setIdScreening] = useState(""); // id dùng để update
  const { data, total, currentPage, totalPages, loading, error, filter } =
    useSelector(dataScreen); //tất carselector của redux

  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  ); //khỏi tạo phân trang

  useEffect(() => {
    dispatch(setInitialScreen(initData)); //dùng để hiển thị dữ liệu render lần đâu
  }, [dispatch, initData]);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (page <= totalPages) {
      // nếu trang hiện tại bé tồng số trang thì gọi action fectch dữ liêu bên redux và limit, page là rowPerPage, page từ hook phân trang ở dòng 43 và các giá trị còn lại là các filter trong selectors
      dispatch(
        fetchScreen({
          limit: rowsPerPage,
          page: page,
          date: filter.date,
          movie: filter.movie,
          showtype: filter.showtype,
          status: filter.status,
          timeEnd: filter.timeEnd,
          timeStart: filter.timeStart,
        })
      );
    } else {
      // nếu ngược điều kiện trên thì page sẽ là totalPages
      dispatch(
        fetchScreen({
          limit: rowsPerPage,
          page: totalPages,
          date: filter.date,
          movie: filter.movie,
          showtype: filter.showtype,
          status: filter.status,
          timeEnd: filter.timeEnd,
          timeStart: filter.timeStart,
        })
      );
    }
  }, [
    dispatch,
    page,
    rowsPerPage,
    totalPages,
    filter.date,
    filter.movie,
    filter.showtype,
    filter.status,
    filter.timeEnd,
    filter.timeStart,
  ]);

  const col: Column<Screening>[] = [
    {
      key: "movieName",
      title: "Tên phim",
      render(row) {
        return (
          <p className="line-clamp-1" title={row.movieName}>
            {row.movieName}
          </p>
        );
      },
    },
    { key: "roomCode", title: "Phòng" },
    { key: "time_start", title: "Thời gian chiếu" },
    { key: "time_end", title: "Thời gian ngừng" },
    {
      key: "date",
      title: "Ngày chiếu",
      render(row) {
        const date = new Date(row.date);
        return <p>{date.toLocaleDateString("vi-VN")}</p>;
      },
    },
    {
      key: "showtype",
      title: "Kiểu chiếu",
      render(row) {
        return <p>{row.showtype === 1 ? "Phụ đề" : "Lồng tiếng"}</p>;
      },
    },
    {
      key: "price",
      title: "Giá (VNĐ)",
      render(row) {
        return (
          <p>
            {row.price !== undefined
              ? row.price.toLocaleString("vi-VN")
              : "N/A"}
          </p>
        );
      },
    },
    {
      key: "status",
      title: "Trạng Thái",
      render: (row: Screening) => (
        <Status
          title={row.status === 1 ? "Ngưng hoạt động" : "Đang hoạt động"} // tên của status
          color={row.status === 1 ? "error" : "success"} // màu của status
        />
      ),
    },
    {
      title: "Thao Tác",
      render(row: Screening) {
        return (
          <div className="flex gap-2">
            <ActionButton
              label="Sửa"
              bgColor="warning"
              onClick={() => handleOpenUpdate(row._id)} // truyền hàm đã viết vào và truyền cái id của cái hàng đó
            />
          </div>
        );
      },
    },
  ];
  const handleOpenUpdate = async (id: string) => {
    // hàm xử lí lấy id để update và mở form update
    setIdScreening(id);
    setOpenUpdateForm(true);
  };
  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>; // nếu loading là true thì loading
  if (error) return <p className="text-red-500 text-center">{error}</p>; // có lỗi thì báo

  return (
    <>
      {/* data chính là cái data của selector truyền thảng vào props data cảu cái Table này là đc k cần phải chuyển đổi tùm lum */}
      <Table column={col} data={data} />

      {total >= rowsPerPage && ( // nếu tổng số item trong data >= số limit mới có phần trang ví dụ tổng item là 4, limit là 5 thì k hiện còn lớn hon là hiện
        <Pagination
          currentPage={currentPage}
          total={total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      )}
      {openUpdateForm &&
        idScreening && ( //nếu openUpdateForm=true và idScreening tồn tại thì mở cái update
          <UpdateFormContainer
            id={idScreening} // truyền id nhận đc vào
            movies={moviesOptions} //dữ liệu để làm select/option
            rooms={rooms} //dữ liệu để làm select/option
            closeForm={() => setOpenUpdateForm(false)} // dùng để đóng form
          />
        )}
    </>
  );
};

export default ScreenList;
