import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/components/UserFormContainer/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
