import { fetchStockList, fetchStockQuote } from "../stocksAPI";

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
  it("fetchStockQuote", async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        "Global Quote": {
          "01. symbol": "IBM",
          "02. open": "130.0000",
          "03. high": "130.9600",
          "04. low": "129.5200",
          "05. price": "130.6300",
          "06. volume": "3649044",
          "07. latest trading day": "2021-12-23",
          "08. previous close": "129.7500",
          "09. change": "0.8800",
          "10. change percent": "0.6782%",
        },
      })
    );
    const stockQuote = await fetchStockQuote("IBM");
    // should fetch and strip out and simplify the response
    expect(stockQuote).toEqual({
      symbol: "IBM",
      high: 130.96,
      low: 129.52,
      changePercent: 0.6782,
      price: 130.63,
    });
  });
});
