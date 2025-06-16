import api from "@/utils/http";
const getMovieList = async (param: string) => {
  try {
    const res = api.get(`/movie${param}`);
<<<<<<< Updated upstream
    return (await res).data;
=======
    return await res;
>>>>>>> Stashed changes
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export { getMovieList };
