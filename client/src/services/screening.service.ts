// import api from "@/utils/http";
// const getScreeningList = async (param: string = "") => {
//   try {
//     const res = api.get(`/sreenings${param}`);
//     return await res;
//   } catch (error) {
//     console.log("Error fetching data:", error);
//   }
// };
// export { getScreeningList };


import api from "@/utils/http";
const getScreeningList = async (param: string = "") => {
  try {
    const res = await api.get(`/screening${param}`); // ✅ đảm bảo route đúng chính tả
    return res;
  } catch (error) {
    console.error("Error fetching screening list:", error);
    throw error;
  }
};

export { getScreeningList };



