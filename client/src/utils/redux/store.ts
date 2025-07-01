import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomSlice from "./slices/roomSlice";
import ratingReducer from "./slices/ratingSlice";
import userReducer from "./slices/userSlice";
import movieReducer from "./slices/movieSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    roomManagement: roomSlice,
    rating: ratingReducer,
    user: userReducer,
    movie: movieReducer,
  },
});


// Type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
