import api from "@/utils/http";
const getUserList = async (param: string = "") => {
  try {
    const res = api.get(`/user${param}`);
    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export { getUserList };
