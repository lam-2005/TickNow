import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "@/components/UserFormContainer/authSlice";
import voucherSlide from "@/utils/redux/slices/voucherSlice";
import cinemaSlice from "@/utils/redux/slices/cinemaSlice";
import locationSlice from "@/utils/redux/slices/locationSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    voucherCrud: voucherSlide,
    cinemaCrud: cinemaSlice,
    locationCrud: locationSlice,
  },
});

// Type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
