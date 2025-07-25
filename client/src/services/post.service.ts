import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
import { DataPostReq } from "@/interfaces/post.interface";
const getPostList = async (param: string = "") => {
  try {
    const res = api.get(`/post${param}`);
    return await res;
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại");
  }
};
const addPostAPI = async (req: DataPostReq) => {
  try {
    const form = new FormData();
    form.append("title", req.title);
    form.append("content", req.content);
    form.append("start_day", req.start_day);
    form.append("end_day", req.end_day);
    form.append("voucher", req.voucher || "");
    if (req.image) form.append("image", req.image);

    const res = await api.post("/post/add", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    catchingError(error, "Thêm bài thất bại!");
  }
};

const updatePostAPI = async (id: string, req: DataPostReq) => {
  try {
    const form = new FormData(); // dùng để gửi ảnh
    form.append("title", req.title);
    form.append("content", req.content);
    form.append("start_day", req.start_day);
    form.append("end_day", req.end_day);
    form.append("voucher", req.voucher || "");
    if (req.status !== undefined) form.append("status", req.status.toString());
    if (req.image) form.append("image", req.image);

    const res = await api.patch(`/post/update/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật bài thất bại!");
  }
};

const deletePostAPI = async (id: string) => {
  try {
    const res = await api.delete(`/post/delete/${id}`);
    return res;
  } catch (error) {
    catchingError(error, "Xóa bài thất bại!");
  }
};

export const getPost = async (
  page: number,
  limit: number,
  title: string = ""
) => {
  const res = await getPostList(`?page=${page}&limit=${limit}&title=${title}`);
  return {
    posts: res?.data.post,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
    title: title,
  };
};

export { getPostList, addPostAPI, deletePostAPI, updatePostAPI };
