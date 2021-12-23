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

  useEffect(() => {
    if (searchValue) {
      fetchStockList(searchValue).then((fetchedStocks) =>
        setStockList(fetchedStocks)
      );
    }
  }, [searchValue]);

  const handleSearch = (searchString: string) => setSearchValue(searchString);

  const handleSelect = useCallback(
    (key) => {
      dispatch(stockPinned(key));
    },
    [dispatch]
  );

  return (
    <StockListSearch
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={stockList.map((stock) => stock.symbol)}
    />
  );
};
export default StockListContainer;
