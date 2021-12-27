import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCashflow } from "../services/stocksAPI";

const initialState = { data: {} };

export const getStockCashflow = createAsyncThunk(
  "stockCashflow/fetchEarnings",
  async (symbol: string) => {
    const cashflowData = await fetchCashflow(symbol);
    return { symbol, data: cashflowData };
  }
);

const stockQuoteSlice = createSlice({
  name: "stockCashflow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStockCashflow.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.symbol]: action.payload.data,
      };
    });
  },
});

export default stockQuoteSlice.reducer;
