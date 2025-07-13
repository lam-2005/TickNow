import reduxInitStateDefault from "@/configs/reduxInitStateDefault";
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    ...reduxInitStateDefault,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { logout, setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
