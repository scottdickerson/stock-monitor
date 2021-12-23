import { useSelector } from "react-redux";
import { StockMonitorRedux } from "../types/StockTypes";
const PinnedStockListContainer = () => {
  const pinnedStocks = useSelector(
    (state: StockMonitorRedux) => state.pinnedStocks
  );

  return (
    <div>
      {pinnedStocks.map((pinnedStock: string) => (
        <p>{pinnedStock}</p>
      ))}
    </div>
  );
};

export default PinnedStockListContainer;
