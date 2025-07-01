import api from "@/utils/http";
const getMovieList = async (param: string = "") => {
  try {
    const res = api.get(`/movie${param}`);

    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export { getMovieList };
