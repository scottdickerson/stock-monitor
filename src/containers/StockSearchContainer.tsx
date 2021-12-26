import { useState, useEffect, useCallback } from "react";
import { fetchStockList } from "../services/stocksAPI";
import { StockList, StockMonitorRedux } from "../types/StockTypes";
import StockSearch from "../components/StockSearch";
import { stockPinned } from "../reducers/pinnedStockSlice";
import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";

const StockSearchContainer = () => {
  const [stockList, setStockList] = useState<StockList>([]);
  const [searchValue, setSearchValue] = useState<string>();

  const dispatch = useDispatch();

  const pinnedStockSymbols = useSelector(
    (state: StockMonitorRedux) =>
      state.pinnedStocks.map((stock) => stock.symbol),
    isEqual
  );

  // Debounce this fetch every 400 ms to stop killing the server
  useEffect(() => {
    let debouncedSearchTimer: number;
    if (searchValue) {
      debouncedSearchTimer = window.setTimeout(
        () =>
          fetchStockList(searchValue).then((fetchedStocks) =>
            setStockList(
              fetchedStocks.filter(
                (stock) => !pinnedStockSymbols.includes(stock.symbol) // don't show an already pinned one.
              )
            )
          ),
        400
      );
    }
    return () => clearTimeout(debouncedSearchTimer); // stop the search if they type again
  }, [searchValue, pinnedStockSymbols]);

  const handleSearch = (searchString: string) => setSearchValue(searchString);

  const handleSelect = useCallback(
    (key) => {
      dispatch(stockPinned(stockList.find((stock) => stock.symbol === key)));
    },
    [dispatch, stockList]
  );

  return (
    <StockSearch
      disabled={pinnedStockSymbols.length >= 3}
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={stockList}
    />
  );
};
export default StockSearchContainer;
