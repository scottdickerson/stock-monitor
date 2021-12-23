import React from "react";
import "./App.css";
import PinnedStockListContainer from "./containers/PinnedStockListContainer";
import StockListContainer from "./containers/StockListContainer";

function App() {
  return (
    <div className="App">
      <StockListContainer />
      <PinnedStockListContainer />
    </div>
  );
}

export default App;
