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
};
const initialState: RoomManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,

  ...reduxInitStateDefault,
};

export const fetchTicket = createAsyncThunk(
  "ticket/fetchTicket",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const res = await getTicketData(page, limit);
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
