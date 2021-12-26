import React from "react";
import "./App.css";
import PinnedStockListContainer from "./containers/PinnedStockListContainer";
import StockSearchContainer from "./containers/StockSearchContainer";

function App() {
  return (
    <div className="App">
      <h1>Stock Comparison</h1>
      <p>Enter up to 3 stocks to compare the current stock prices.</p>
      <StockSearchContainer />
      <PinnedStockListContainer />
    </div>
  );
}

export default App;
