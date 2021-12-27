import { configureStore } from "@reduxjs/toolkit";
import pinnedStockReducer from "./reducers/pinnedStockSlice";
import stockEarningsSlice from "./reducers/stockEarningsSlice";
import stockDetailsSlice from "./reducers/stockQuotesSlice";

const store = configureStore({
  reducer: {
    pinnedStocks: pinnedStockReducer,
    stockQuotes: stockDetailsSlice,
    stockEarnings: stockEarningsSlice,
  },
});

export default store;
