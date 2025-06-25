"use client";
import { loginAPI } from "@/services/user.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await loginAPI(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const user =
  typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    token: token,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
