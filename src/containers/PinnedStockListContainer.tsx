import { useSelector, useDispatch } from "react-redux";
import { Stock, StockMonitorRedux } from "../types/StockTypes";
import StockQuoteContainer from "./StockQuoteContainer";
import StockQuoteTile, { Tiles } from "../components/StockQuoteTile";
import { useCallback } from "react";
import { stockUnpinned } from "../reducers/pinnedStockSlice";

const PinnedStockListContainer = () => {
  const dispatch = useDispatch();
  const pinnedStocks = useSelector(
    (state: StockMonitorRedux) => state.pinnedStocks
  );

  const handleClose = useCallback(
    (stockSymbol) => {
      dispatch(stockUnpinned(stockSymbol));
    },
    [dispatch]
  );

  return (
    <div>
      <Tiles>
        {pinnedStocks.map((pinnedStock: Stock) => (
          <StockQuoteContainer
            key={pinnedStock.symbol}
            symbol={pinnedStock.symbol}
          >
            <StockQuoteTile name={pinnedStock.name} onClose={handleClose} />
          </StockQuoteContainer>
        ))}
      </Tiles>
    </div>
  );
};

export default PinnedStockListContainer;
