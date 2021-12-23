import { configureStore } from "@reduxjs/toolkit";
import pinnedStockReducer from "./reducers/pinnedStockSlice";

const store = configureStore({
  reducer: {
    pinnedStocks: pinnedStockReducer,
  },
});

export default store;
