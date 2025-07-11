import { LoginType, UserReq } from "@/interfaces/user.interface";
import catchingError from "@/utils/catchingError";
import api from "@/utils/http";
import { FieldsType } from "@/utils/validate";
const getUserList = async (param: string = "") => {
  try {
    const res = api.get(`/user${param}`);
    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
    catchingError(error, "Lấy dữ liệu thất bại");
  }
};
const loginAPI = async (data: LoginType) => {
  try {
    const res = await api.post("/user/login", data);
    return res;
  } catch (error) {
    catchingError(error, "Đăng nhập thất bại!");
  }
};
const signupAPI = async (data: FieldsType) => {
  try {
    const res = await api.post("/user/register", data);
    console.log(res);

    return res;
  } catch (error) {
    catchingError(error, "Đăng ký thất bại!");
  }
};
const addUser = async (data: UserReq) => {
  try {
    const res = await api.post("/user/register", data);
    return res;
  } catch (error) {
    catchingError(error, "Đăng ký thất bại!");
  }
};

const updateUserAPI = async (id: string, req: UserReq) => {
  try {
    const res = await api.patch(`/user/update/${id}`, req);
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật người dùng thất bại!");
  }
};
export { getUserList, loginAPI, signupAPI ,addUser, updateUserAPI};
