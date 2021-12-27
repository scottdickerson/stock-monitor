import { StockList, StockMonitorRedux } from "../types/StockTypes";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStockEarnings } from "../reducers/stockEarningsSlice";

type StockGraphContainerTypes = {
  stocks: StockList;
  children: React.ReactNode;
};

/** Loads stock earnings and cash flow for graphs */
const StockGraphContainer = ({
  stocks,
  children,
}: StockGraphContainerTypes) => {
  const dispatch = useDispatch();
  const earnings = useSelector(
    (state: StockMonitorRedux) => state.stockEarnings.data
  );

  console.log("earnings", earnings);
  useEffect(() => {
    // load each of the stocks earnings
    stocks.forEach((stock) => dispatch(getStockEarnings(stock.symbol)));
  }, [stocks, dispatch]);

  const chartData = useMemo(() => {
    return stocks.map((stock) => ({
      name: stock.symbol,
      data: earnings[stock.symbol],
    }));
  }, [stocks, earnings]);

  return React.isValidElement(children)
    ? React.cloneElement(children, {
        data: chartData,
        xaxis: "fiscalDateEnding",
        yaxis: "reportedEPS",
      })
    : null;
};

export default StockGraphContainer;
