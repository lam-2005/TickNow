import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomSlice from "./slices/roomSlice";
import ratingSlice from "./slices/ratingSlice";
import userSlice from "./slices/userSlice";
import movieSlice from "./slices/movieSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    roomManagement: roomSlice,
    ratingManagement: ratingSlice,
    userManagement: userSlice,
    movieManagement: movieSlice,
  },
});


// Type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
