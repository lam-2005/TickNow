import api from "@/utils/http";
const getRateList = async (param: string = "") => {
  try {
    const res = api.get(`/rate${param}`);
    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export { getRateList };
