import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReq, UserType } from "@/interfaces/user.interface";
import * as userService from "@/services/user.service";

type UserState = {
  users: UserType[];
  total: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    status: string;
    role: string;
  };
};

const initialState: UserState = {
  users: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  errorAddData: null,
  errorUpdateData: null,
  filter: {
    status: "",
    role: "",
  },
};

export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async (
    {
      page,
      limit,
      status = "",
      role = "",
    }: { page: number; limit: number; status?: string; role?: string },
    thunkAPI
  ) => {
    try {
      const query = new URLSearchParams();
      query.append("page", page.toString());
      query.append("limit", limit.toString());
      if (status) query.append("status", status);
      if (role) query.append("role", role);

      const res = await userService.getUserList(`?${query.toString()}`);
      return {
        users: res?.data.user,
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
        status,
        role,
      };
    } catch {
      return thunkAPI.rejectWithValue("Không thể tải danh sách người dùng.");
    }
  }
);

export const updateUser = createAsyncThunk(
  "userManagement/updateUser",
  async ({ id, data }: { id: string; data: UserReq }, thunkAPI) => {
    try {
      const res = await userService.updateUserAPI(id, data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addUser = createAsyncThunk(
  "userManagement/addUser",
  async (data: UserReq, thunkAPI) => {
    try {
      const res = await userService.addUser(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setInitialUsers(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    setFilter(state, action: PayloadAction<{ status: string; role: string }>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.filter.status = action.payload.status;
        state.filter.role = action.payload.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.errorAddData = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.errorAddData = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.errorUpdateData = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorUpdateData = action.payload as string;
      });
  },
});

export const { setInitialUsers, setFilter } = userSlice.actions;
export default userSlice.reducer;
