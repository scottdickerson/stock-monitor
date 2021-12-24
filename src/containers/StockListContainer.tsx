import { useState, useEffect, useCallback } from "react";
import { fetchStockList } from "../services/stocksAPI";
import { StockList } from "../types/StockTypes";
import StockListSearch from "../components/StockListSearch";
import { stockPinned } from "../reducers/pinnedStockSlice";
import { useDispatch } from "react-redux";

const StockListContainer = () => {
  const [stockList, setStockList] = useState<StockList>([]);
  const [searchValue, setSearchValue] = useState<string>();

  const dispatch = useDispatch();

  // Debounce this fetch every 400 ms to stop killing the server
  useEffect(() => {
    let debouncedSearchTimer: number;
    if (searchValue) {
      debouncedSearchTimer = window.setTimeout(
        () =>
          fetchStockList(searchValue).then((fetchedStocks) =>
            setStockList(fetchedStocks)
          ),
        400
      );
    }
    return () => clearTimeout(debouncedSearchTimer); // stop the search if they type again
  }, [searchValue]);

  const handleSearch = (searchString: string) => setSearchValue(searchString);

  const handleSelect = useCallback(
    (key) => {
      dispatch(stockPinned(stockList.find((stock) => stock.symbol === key)));
    },
    [dispatch, stockList]
  );

  return (
    <StockListSearch
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={stockList}
    />
  );
};
export default StockListContainer;
