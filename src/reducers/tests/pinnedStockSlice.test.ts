import pinnedStockReducer, {
  stockPinned,
  stockUnpinned,
} from "../pinnedStockSlice";

describe("pinnedStockSlice", () => {
  it("pinnedStockReducer stockPinned", () => {
    const state: string[] = [];
    expect(pinnedStockReducer(state, stockPinned("IBM"))).toEqual(["IBM"]);

    expect(pinnedStockReducer(["IBM"], stockPinned("IBM2"))).toEqual([
      "IBM",
      "IBM2",
    ]);
  });
  it("pinnedStockReducer stockUnpinned", () => {
    const state: string[] = ["IBM2"];
    expect(pinnedStockReducer(state, stockUnpinned("IBM"))).toEqual(["IBM2"]);

    expect(pinnedStockReducer(state, stockUnpinned("IBM2"))).toEqual([]);
  });
});
