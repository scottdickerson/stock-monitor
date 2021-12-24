import { configureStore } from "@reduxjs/toolkit";
import pinnedStockReducer from "./reducers/pinnedStockSlice";
import stockDetailsSlice from "./reducers/stockQuotesSlice";

const store = configureStore({
  reducer: {
    pinnedStocks: pinnedStockReducer,
    stockQuotes: stockDetailsSlice,
  },
});

export default store;
