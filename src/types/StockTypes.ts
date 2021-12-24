export interface Stock {
  name: string;
  symbol: string;
}

export type StockList = Stock[];

export type StockMonitorRedux = {
  pinnedStocks: Stock[];
  stockQuotes: {
    data: Record<string, StockQuote>;
  };
};

export type StockQuote = {
  high: number;
  low: number;
  price: number;
  changePercent: number;
  symbol: string;
};
