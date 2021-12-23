export interface Stock {
  name: string;
  symbol: string;
}

export type StockList = Stock[];

export type StockMonitorRedux = {
  pinnedStocks: string[];
};
