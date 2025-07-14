import axios from "axios";
const catchingError = (error: unknown, errorMessageDefault?: string) => {
  let errorMessage = errorMessageDefault || "Có lỗi xảy ra!";
  // Kiểm tra nếu là lỗi của axios
  if (axios.isAxiosError(error)) {
    // Lỗi có response trả về từ server
    if (error.response) {
      // Ví dụ: lấy message từ response.data.message
      errorMessage = error.response.data?.message || "Lỗi không xác định!";
    } else if (error.request) {
      // Không nhận được response
      errorMessage = "Không nhận được phản hồi từ server";
    } else {
      // Lỗi khác khi set up request
      errorMessage = error.message;
    }
    console.error(error);
  } else if (error instanceof Error) {
    // Các lỗi JS runtime khác
    errorMessage = error.message;
  }
  throw new Error(errorMessage);
};
export default catchingError;
