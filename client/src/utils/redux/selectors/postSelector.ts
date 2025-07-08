import { RootState } from "../store";

const postSelector = (state: RootState) => state.postManagement;
export default postSelector;
