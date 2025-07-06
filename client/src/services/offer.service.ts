import api from "@/utils/http";
const getOffersList = async (param: string = "") => {
  try {
    const res = await api.get(`/post${param}`);
    return res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export { getOffersList };
