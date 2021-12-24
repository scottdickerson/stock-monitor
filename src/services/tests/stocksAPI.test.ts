import { fetchStockList } from "../stocksAPI";

describe("stocksAPI", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });
  it("fetchStockList", async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        bestMatches: [
          {
            "1. symbol": "IBA",
            "2. name": "Industrias Bachoco S.A.B. DE C.V.",
          },
          {
            "1. symbol": "IBM",
            "2. name": "International Business Machines",
          },
        ],
      })
    );
    const stockList = await fetchStockList("IBM");
    expect(stockList).toHaveLength(2);
    // Make sure the response is mapped correctly to the simpler format
    expect(stockList.every((stock) => stock.symbol && stock.name)).toEqual(
      true
    );
  });
});
