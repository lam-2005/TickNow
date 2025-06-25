import { LoginType } from "@/interfaces/user.interface";
import api from "@/utils/http";
import { FieldsType } from "@/utils/validate";
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
const signupAPI = async (data: FieldsType) => {
  try {
    const res = await api.post("/user/register", data);
    console.log(res);

    return res;
  } catch (error) {
    throw error || "Đăng ký không thành công";
  }
};
export { getUserList, loginAPI, signupAPI };
