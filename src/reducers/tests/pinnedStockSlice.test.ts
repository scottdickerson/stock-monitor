import { Stock } from "../../types/StockTypes";
import pinnedStockReducer, {
  stockPinned,
  stockUnpinned,
} from "../pinnedStockSlice";
const mockStock = { symbol: "IBM", name: "International Business Machines" };
const mockStock2 = { symbol: "IBM2", name: "International Business Machines2" };
describe("pinnedStockSlice", () => {
  it("pinnedStockReducer stockPinned", () => {
    const state: Stock[] = [];

    expect(pinnedStockReducer(state, stockPinned(mockStock))).toEqual([
      mockStock,
    ]);

    expect(pinnedStockReducer([mockStock], stockPinned(mockStock2))).toEqual([
      mockStock,
      mockStock2,
    ]);
  });
  it("pinnedStockReducer stockUnpinned", () => {
    const state: Stock[] = [mockStock2];
    expect(pinnedStockReducer(state, stockUnpinned("IBM"))).toEqual([
      mockStock2,
    ]);

    expect(pinnedStockReducer(state, stockUnpinned("IBM2"))).toEqual([]);
  });
});
