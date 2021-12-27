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
  stockEarnings: {
    data: Record<string, any>;
  };
  stockCashflow: {
    data: Record<string, any>;
  };
};

export type StockQuote = {
  high: number;
  low: number;
  price: number;
  changePercent: number;
  symbol: string;
};

export type StockEarningAPI = {
  fiscalDateEnding: string;
  reportedEPS: string;
};

export type StockEarning = {
  fiscalDateEnding: number;
  reportedEPS: number;
};

export type StockCashflowAPI = {
  fiscalDateEnding: string;
  operatingCashflow: string;
};

export type StockCashflow = {
  fiscalDateEnding: number;
  operatingCashflow: number;
};
