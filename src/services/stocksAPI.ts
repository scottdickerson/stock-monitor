import { StockList, Stock } from "../types/StockTypes";
import { mapKeys } from "lodash";

// TODO: debounce
export const fetchStockList = async (
  stockSearchString: string
): Promise<StockList> => {
  const { bestMatches: stockData } = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSearchString}&apikey=FQXOTWF1CSZDIBWS`
  ).then((response) => response.json());
  console.log("fetched stocks", stockData);
  const mappedStockData = stockData.map((stock: Stock) =>
    mapKeys(stock, (__value: string, key: string) => {
      // remove extra info and simplify object
      return key.replace(/\d\.\s/, "");
    })
  );
  console.log(mappedStockData);
  return mappedStockData;
};

console.log(fetchStockList("IBM"));
