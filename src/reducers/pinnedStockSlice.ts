import { createSlice } from "@reduxjs/toolkit";
import { Stock } from "../types/StockTypes";

const initialState: Stock[] = []; // will be a list of pinned stock symbols
const pinnedStockSlice = createSlice({
  name: "pinnedStocks",
  initialState,
  reducers: {
    stockPinned: (state, action) => {
      state.push(action.payload);
    },
    stockUnpinned: (state, action) => {
      return state.filter((stock) => stock.symbol !== action.payload); // remove the unpinned stock symbol
    },
  },
});

export default pinnedStockSlice.reducer;

export const { stockPinned, stockUnpinned } = pinnedStockSlice.actions;
