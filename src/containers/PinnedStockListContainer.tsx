import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Stock, StockQuote } from "../types/StockTypes";
import { StockMonitorRedux } from "../types/StockTypes";
import { getStockQuote } from "../reducers/stockQuotesSlice";
const PinnedStockListContainer = () => {
  const pinnedStocks = useSelector(
    (state: StockMonitorRedux) => state.pinnedStocks
  );
  const stockQuotes = useSelector((state: StockMonitorRedux) =>
    Object.values(state.stockQuotes.data)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    pinnedStocks.forEach((stock) => dispatch(getStockQuote(stock.symbol)));
  }, [pinnedStocks, dispatch]);

  return (
    <div>
      {pinnedStocks.map((pinnedStock: Stock) => (
        <p key={pinnedStock.symbol}>
          {pinnedStock.symbol} {pinnedStock.name}
        </p>
      ))}
      {stockQuotes.map((stockQuote: StockQuote) => (
        <p key={stockQuote.high}>{JSON.stringify(stockQuote)}</p>
      ))}
    </div>
  );
};

export default PinnedStockListContainer;
