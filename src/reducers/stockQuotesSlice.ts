import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStockQuote } from "../services/stocksAPI";

const initialState = { data: {} };

export const getStockQuote = createAsyncThunk(
  "stockQuotes/fetchStockQuote",
  async (symbol: string) => {
    return fetchStockQuote(symbol);
  }
);

const stockQuoteSlice = createSlice({
  name: "stockQuotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStockQuote.fulfilled, (state, action) => {
      state.data = { ...state.data, [action.payload.symbol]: action.payload };
    });
  },
});

export default stockQuoteSlice.reducer;
