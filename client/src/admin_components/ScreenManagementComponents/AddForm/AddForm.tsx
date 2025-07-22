"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchScreen, addScreen } from "@/utils/redux/slices/screenSlice";
import { toast } from "react-toastify";
import InputGroup from "./InputGroup";
import { ScreenReq } from "@/interfaces/screening.interface";
import { MovieType } from "@/interfaces/movie.interface";
import { RoomType } from "@/interfaces/room.interface";
import dataScreen from "@/utils/redux/selectors/screenSelector";
import { useConfirm } from "@/hooks/contexts/useConfirm";
export type MovieOptionsType = {
  // đây là kiểu dữu liệu của select/option movie
  label: string;
  id: string;
};
const AddForm = ({
  movies, //dữ liệu movie đã fetch ở file page dùng để làm select/option
  rooms, // giống movie
}: {
  movies: MovieType[];
  rooms: RoomType[];
}) => {
  const confirm = useConfirm();
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(dataScreen);
  const [formData, setFormData] = useState<ScreenReq>({
    // dữ liệu khỏi tạo của form
    id_room: "",
    id_movie: "",
    time_start: "",
    date: "",
    showtype: 1,
    price: "",
  });
  const listOptionMovies: MovieOptionsType[] = movies.map((item) => {
    // dùng để biến cái data movie từ kiểu MOvieType ở interface thành dạng MovieOptionsType với label là dùng để hiển thị ui , id là giá trị nhận đc
    return {
      label: item.name,
      id: item._id,
    };
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      //check nếu k có dwux liệu của 1 trong tất cả các input thì báo
      !formData.id_room ||
      !formData.id_movie ||
      !formData.time_start ||
      !formData.date ||
      !formData.showtype ||
      !formData.price
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!!");
      return;
    }

    const confirmAdd = await confirm({
      title: "Bạn có muốn thêm suất này?",
      content: "Hành động này sẽ không thể hoàn tác",
    }); //thông báo
    if (!confirmAdd) return;
    try {
      /*nếu ok thì dispatch action thêm dữ liệu với formdata. Lưu ý nếu muốn lưu mọi thứ từ formdata mà k cần thay đổi gì thì chỉ cần addScreen(formdata), còn nếu muons thay đổi 1 chút như là muốn giá của suất là dang số (nếu be yêu càn price phải là số) thì 
      addScreen({
      ...formData, // mấy cái k cần thay đổi thì bảo lưu lại
       price:Number(formData.price) cái cần thay đổi thì gọi với key là cái phần tử cần thay đổi của formdata vói valu là gtri mới
      })*/
      await dispatch(
        addScreen({
          ...formData,
          showtype: Number(formData.showtype),
          price: Number(formData.price),
        })
      ).unwrap();

      await dispatch(
        // dispatch action fetch dữ liêu của redux để cập nhật dữ liệu
        fetchScreen({
          page: 1, //sau khi thêm quay về trang 1
          limit: 5, //giới hạn là 5
          date: filter.date, // giữu nguyên các giá trị nếu bảng hiện tại đang lọc 1 cacsi gì đó (nhớ gọi filter từ selectors)
          movie: filter.movie, // giữu nguyên các giá trị nếu bảng hiện tại đang lọc 1 cacsi gì đó (nhớ gọi filter từ selectors)
          showtype: filter.showtype, // giữu nguyên các giá trị nếu bảng hiện tại đang lọc 1 cacsi gì đó (nhớ gọi filter từ selectors)
          status: filter.status, // giữu nguyên các giá trị nếu bảng hiện tại đang lọc 1 cacsi gì đó (nhớ gọi filter từ selectors)
          timeEnd: filter.timeEnd, // giữu nguyên các giá trị nếu bảng hiện tại đang lọc 1 cacsi gì đó (nhớ gọi filter từ selectors)
          timeStart: filter.timeStart, // giữu nguyên các giá trị nếu bảng hiện tại đang lọc 1 cacsi gì đó (nhớ gọi filter từ selectors)
        })
      );
      toast.success("Thêm Suất chiếu thành công!");

      // Reset
      setFormData({
        id_room: "",
        id_movie: "",
        time_start: "",
        date: "",
        showtype: 1,
        price: "",
      });
    } catch (err) {
      console.error("Lỗi thêm Suất chiếu:", err);
      toast.error(`Thêm Suất chiếu thất bại: ${err}`);
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData} // truyền vào để có thể thay đổi input
          setFormData={setFormData} // truyền vào để thay đổi input
          listOptionMovies={listOptionMovies} // dùng làm select/option
          listOptionRooms={rooms} // dùng làm select/option
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-green rounded-2xl">
        {/* gọi hàm thêm */}
        <button className="btn" onClick={handleAddUser}>
          Thêm Suất chiếu
        </button>
      </div>
    </>
  );
};

export default AddForm;
