import { StockList, StockMonitorRedux } from "../types/StockTypes";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStockEarnings } from "../reducers/stockEarningsSlice";

type StockEarningsGraphContainerTypes = {
  stocks: StockList;
  children: React.ReactNode;
};

/** Loads stock earnings and cash flow for graphs */
const StockEarningsGraphContainer = ({
  stocks,
  children,
}: StockEarningsGraphContainerTypes) => {
  const dispatch = useDispatch();
  const earnings = useSelector(
    (state: StockMonitorRedux) => state.stockEarnings.data
  );

  console.log("earnings", earnings);
  useEffect(() => {
    // load each of the stocks earnings
    stocks.forEach((stock) => {
      // this is just a caching optimization because the API throttles at 5 per minute, don't load previous ones
      if (!earnings?.[stock.symbol]) {
        dispatch(getStockEarnings(stock.symbol));
      }
    });
  }, [stocks, dispatch, earnings]);

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

export default StockEarningsGraphContainer;
