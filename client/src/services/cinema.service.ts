import api from "@/utils/http"; 

const getCinemaList = async () => {
  try {
    const res = await api.get("/cinema");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp chiếu:", error);
    throw error;
  }
};

export { getCinemaList };
