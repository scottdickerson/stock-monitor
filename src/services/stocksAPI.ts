import { StockList, Stock, StockQuote } from "../types/StockTypes";
import { mapKeys, isNil } from "lodash";

const STOCK_BASE_URL = "https://www.alphavantage.co/query?";
const API_KEY = "FQXOTWF1CSZDIBWS";
export const fetchStockList = async (
  stockSearchString: string
): Promise<StockList> => {
  const { bestMatches: stockData } = await fetch(
    `${STOCK_BASE_URL}function=SYMBOL_SEARCH&keywords=${stockSearchString}&apikey=${API_KEY}`
  ).then((response) => response.json());
  console.log("unmapped stock data", stockData);
  if (isNil(stockData)) {
    console.error(
      "cannot fetch stock data maybe you've exceeded the API calls. Should handle this better"
    );
    return [];
  }
  const mappedStockData = stockData.map((stock: Stock) =>
    simplifyAPIResponse(stock)
  );
  console.log("mapped stock data", mappedStockData);
  return mappedStockData;
};

export const fetchStockQuote = async (symbol: string): Promise<StockQuote> => {
  const { "Global Quote": stockQuote } = await fetch(
    `${STOCK_BASE_URL}function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  ).then((response) => response.json());
  console.log("unmapped stock data", stockQuote);
  if (isNil(stockQuote)) {
    console.error(
      "cannot fetch stock data maybe you've exceeded the API calls. Should handle this better"
    );
    return {} as StockQuote;
  }
  const simplifiedQuote = simplifyAPIResponse(stockQuote);
  return {
    high: parseFloat(simplifiedQuote.high),
    low: parseFloat(simplifiedQuote.low),
    price: parseFloat(simplifiedQuote.price),
    changePercent: parseFloat(
      simplifiedQuote["change percent"].replace("%", "")
    ),
    symbol,
  };
};

const simplifyAPIResponse = (stock: any): any =>
  mapKeys(stock, (__value: string, key: string) => {
    // remove extra info and simplify object
    return key.replace(/^\d*\.\s/, "");
  });
