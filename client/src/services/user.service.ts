import { LoginType } from "@/interfaces/user.interface";
import api from "@/utils/http";
const getUserList = async (param: string = "") => {
  try {
    const res = api.get(`/user${param}`);
    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
const loginAPI = async (data: LoginType) => {
  try {
    const res = await api.post("/user/login", data);
    return res;
  } catch (error) {
    throw error || "Đăng nhập không thành công";
  }
};
export { getUserList, loginAPI };
