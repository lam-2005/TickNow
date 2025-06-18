import api from "@/utils/http";

const getVoucher = async(param: string = "") =>{
   try {
    const res =api.get(`/voucher${param}`);
    return await res;
   } catch (error) {
    console.log("Error fetch data: ",error);
    
   }
}

export { getVoucher };