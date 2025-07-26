import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ticket } from "@/interfaces/ticket.interface";
import { getTicketData } from "@/services/ticket.service";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";

export type RoomManagementState = ReduxInitStateDefaultType & {
  data: Ticket[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    movieId: string;
    date: string;
    type: string;
  };
};
const initialState: RoomManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  filter: {
    movieId: "",
    date: "",
    type: "",
  },
  ...reduxInitStateDefault,
};

export const fetchTicket = createAsyncThunk(
  "ticket/fetchTicket",
  async (
    {
      page,
      limit,
      movieId = "",
      date = "",
      type = "",
    }: {
      page: number;
      limit: number;
      movieId?: string;
      date?: string;
      type?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await getTicketData(page, limit, movieId, date, type);
      return res;
    } catch {
      return thunkAPI.rejectWithValue("Không thể tải danh sách vé.");
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setInitialTicket(state, action) {
      return { ...state, ...action.payload };
    },
    setFilter: (state, action) => {
      // dùng ddeeer lưu giá trị lọc
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicket.fulfilled, (state, action) => {
        state.data = action.payload.ticket;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.filter.movieId = action.payload.movieId;
        state.filter.date = action.payload.date;
        state.filter.type = action.payload.type;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInitialTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
