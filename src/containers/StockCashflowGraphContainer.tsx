import { StockList, StockMonitorRedux } from "../types/StockTypes";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStockCashflow } from "../reducers/stockCashflowSlice";

type StockCashflowGraphContainerTypes = {
  stocks: StockList;
  children: React.ReactNode;
};

/** Loads stock earnings and cash flow for graphs */
const StockCashflowGraphContainer = ({
  stocks,
  children,
}: StockCashflowGraphContainerTypes) => {
  const dispatch = useDispatch();
  const cashflow = useSelector(
    (state: StockMonitorRedux) => state.stockCashflow.data
  );

  console.log("cashflow", cashflow);
  useEffect(() => {
    // load each of the stocks cashflow
    stocks.forEach((stock) => {
      // this is just a caching optimization because the API throttles at 5 per minute, don't load previous ones
      if (!cashflow?.[stock.symbol]) {
        dispatch(getStockCashflow(stock.symbol));
      }
    });
  }, [stocks, dispatch, cashflow]);

  const chartData = useMemo(() => {
    return stocks.map((stock) => ({
      name: stock.symbol,
      data: cashflow[stock.symbol],
    }));
  }, [stocks, cashflow]);

  return React.isValidElement(children)
    ? React.cloneElement(children, {
        data: chartData,
        xaxis: "fiscalDateEnding",
        yaxis: "operatingCashflow",
      })
    : null;
};

export default StockCashflowGraphContainer;
