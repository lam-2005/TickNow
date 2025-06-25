import api from "@/utils/http";
const getRooom = async (param: string = "") => {
  try {
    const res = api.get(`/room${param}`);
    console.log(await res);

    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export { getRooom };
