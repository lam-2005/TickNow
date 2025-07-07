import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomSlice from "./slices/roomSlice";
import voucherSlide from "@/utils/redux/slices/voucherSlice";
import cinemaSlice from "@/utils/redux/slices/cinemaSlice";
import postSlice from "@/utils/redux/slices/postSlice";

const store = configureStore({
  reducer: {
     auth: authReducer,
    roomManagement: roomSlice,
    voucherManagement: voucherSlide,
    cinemaManagement: cinemaSlice,
    postManagement: postSlice,
  },
});

// Type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
