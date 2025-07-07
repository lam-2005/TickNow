import { Post } from "@/interfaces/post.interface";
import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

// Lấy danh sách bài viết
const getPostList = async (param: string = "") => {
  try {
    const res = await api.get(`/post${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu bài viết!");
  }
};

// Thêm bài viết mới
const createPostService = async (data: Post) => {
  try {
    const { id_user, title, content, start_day, end_day, status, image } = data;
    const res = await api.post(`/post/add`, {
      id_user,
      title,
      content,
      start_day,
      end_day,
      status,
      image,
    });
    return res;
  } catch (error) {
    catchingError(error, "Thêm bài viết thất bại!");
  }
};

// Cập nhật bài viết
const updatePostService = async (data: Post) => {
  try {
    const { _id, id_user, title, content, start_day, end_day, status, image } = data;
    const res = await api.post(`/post/update`, {
      _id,
      id_user,
      title,
      content,
      start_day,
      end_day,
      status,
      image,
    });
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật bài viết thất bại!");
  }
};

export { getPostList, createPostService, updatePostService };
