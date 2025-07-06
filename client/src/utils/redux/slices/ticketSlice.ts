import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Screening, ScreenReq } from "@/interfaces/screening.interface";
import * as ticketService from "@/services/ticket.service";
import { Ticket, TicketDetail } from "@/interfaces/ticket.interface";

type TicketState = {
  ticket: TicketDetail[];
  total: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  errorAddData: string | null;
  errorUpdateData: string | null;
};

const initialState: TicketState = {
  ticket: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  errorAddData: null,
  errorUpdateData : null,
};

export const fetchTicket = createAsyncThunk(
  "ticket/fetchTicket",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const res = await ticketService.getTicketList(`?page=${page}&limit=${limit}`);
      return {
        ticket: res?.data.result, // ✅ đúng field từ API
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
      };
    } catch {
      return thunkAPI.rejectWithValue("Không thể tải danh sách vé.");
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setInitialTicket(state, action: PayloadAction<TicketState>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicket.fulfilled, (state, action) => {
        state.ticket = action.payload.ticket;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { setInitialTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
