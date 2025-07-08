import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomSlice from "./slices/roomSlice";
import ratingSlice from "./slices/ratingSlice";
import screenSlice from "./slices/screenSlice";
import userSlice from "./slices/userSlice";
import movieSlice from "./slices/movieSlice";
import ticketSlice from "./slices/ticketSlice";
import postSlice from "./slices/postSlice";


const store = configureStore({
  reducer: {
     auth: authReducer,
    roomManagement: roomSlice,
    ratingManagement: ratingSlice,
    userManagement: userSlice,
    movieManagement: movieSlice,
    screenManagement: screenSlice,
    ticketManagement: ticketSlice,

    postManagement: postSlice,
  },
});

// Type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
