import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = []; // will be a list of pinned stock symbols
const pinnedStockSlice = createSlice({
  name: "pinnedStocks",
  initialState,
  reducers: {
    stockPinned: (state, action) => {
      state.push(action.payload);
    },
    stockUnpinned: (state, action) => {
      return state.filter((stock) => stock !== action.payload); // remove the unpinned stock symbol
    },
  },
});

export default pinnedStockSlice.reducer;

export const { stockPinned, stockUnpinned } = pinnedStockSlice.actions;
