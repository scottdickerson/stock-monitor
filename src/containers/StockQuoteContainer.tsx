import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getStockQuote } from "../reducers/stockQuotesSlice";
import { StockMonitorRedux } from "../types/StockTypes";

type StockQuoteContainerTypes = {
  symbol: string;
  children: React.ReactNode;
};

const StockQuoteContainer = ({
  symbol,
  children,
}: StockQuoteContainerTypes) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockQuote(symbol));
  }, [symbol, dispatch]);

  const stockQuote = useSelector(
    (state: StockMonitorRedux) => state.stockQuotes?.data?.[symbol]
  );

  console.log("Stock Quote", stockQuote);
  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              current: stockQuote?.price,
              trend: stockQuote?.changePercent,
              high: stockQuote?.high,
              low: stockQuote?.low,
              symbol,
            })
          : null
      )}
    </>
  );
};

export default StockQuoteContainer;
