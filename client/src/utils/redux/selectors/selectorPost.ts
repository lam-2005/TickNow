import { RootState } from "@/utils/redux/store";

const dataPostSelector = (state: RootState) => state.postManagement;
export default dataPostSelector;
