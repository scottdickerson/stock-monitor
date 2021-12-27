import { configureStore } from "@reduxjs/toolkit";
import pinnedStockReducer from "./reducers/pinnedStockSlice";
import stockCashflowSlice from "./reducers/stockCashflowSlice";
import stockEarningsSlice from "./reducers/stockEarningsSlice";
import stockDetailsSlice from "./reducers/stockQuotesSlice";

const store = configureStore({
  reducer: {
    pinnedStocks: pinnedStockReducer,
    stockQuotes: stockDetailsSlice,
    stockEarnings: stockEarningsSlice,
    stockCashflow: stockCashflowSlice,
  },
});

export default store;
