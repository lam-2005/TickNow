import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomSlice from "./slices/roomSlice";
import ratingReducer from "./slices/ratingSlice";
import userSlice from "./slices/userSlice";
import movieSlice from "./slices/movieSlice";
import screenSlice from "./slices/screenSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    roomManagement: roomSlice,
    rating: ratingReducer,
    userManagement: userSlice,
    movieManagement: movieSlice,
    screenManagement: screenSlice,

  },
});


// Type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
