import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEPS } from "../services/stocksAPI";

const initialState = { data: {} };

export const getStockEarnings = createAsyncThunk(
  "stockEarnings/fetchEarnings",
  async (symbol: string) => {
    const earningsData = await fetchEPS(symbol);
    return { symbol, data: earningsData };
  }
);

const stockQuoteSlice = createSlice({
  name: "stockEarnings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStockEarnings.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.symbol]: action.payload.data,
      };
    });
  },
});

export default stockQuoteSlice.reducer;
