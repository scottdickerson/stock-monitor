import { ReactComponent as ArrowDown } from "./arrow-down.svg";
import { ReactComponent as ArrowUp } from "./arrow-up.svg";
import { isNil } from "lodash";
import "./StockQuoteTile.css";

type TileTypes = {
  children: React.ReactNode;
  onClose?: (details: any) => void;
};
export const Tile = ({ children, onClose }: TileTypes) => {
  return (
    <div className="Tile">
      {onClose ? <button onClick={onClose}>Close</button> : null}
      {children}
    </div>
  );
};

type TilesType = {
  children: React.ReactNode;
};
export const Tiles = ({ children }: TilesType) => {
  return <div className="Tiles">{children}</div>;
};

type TableTypes = {
  columns: string[];
  rows: Record<string, any>[];
};
export const Table = ({ columns, rows }: TableTypes) => {
  return (
    <table>
      <tbody>
        {rows.map((row: Record<string, any>, index) => {
          return (
            <tr key={`row${index}`}>
              {columns.map((column: string, columnIndex) => {
                return <td key={`column${columnIndex}`}>{row[column]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

type StockCurrentValueTypes = {
  current?: number;
  trend?: number;
};
export const StockCurrentValue = ({
  current,
  trend,
}: StockCurrentValueTypes) => {
  return !isNil(trend) && !isNil(current) ? (
    <div className="StockQuote">
      {trend > 0 ? (
        <ArrowUp className="ArrowUp" />
      ) : (
        <ArrowDown className="ArrowDown" />
      )}
      <div className="CurrentValue">
        <span>{`$${current}`}</span>
        <span className={trend > 0 ? "ArrowUp" : "ArrowDown"}>{`${trend.toFixed(
          1
        )}%`}</span>
      </div>
    </div>
  ) : null;
};

type StockQuoteTileTypes = StockCurrentValueTypes & {
  name: string;
  symbol?: string;
  high?: number;
  low?: number;
  onClose: (symbol: string) => void;
};

const StockQuoteTile = ({
  name,
  symbol,
  current,
  trend,
  high,
  low,
  onClose,
}: StockQuoteTileTypes) => {
  return (
    <Tile onClose={symbol ? () => onClose(symbol) : undefined}>
      <>
        <h2 className="Name">{name}</h2>
        {!isNil(current) ? (
          <>
            <StockCurrentValue current={current} trend={trend} />
            <h2>Stats</h2>
            <Table
              rows={[
                { stat: "High", value: high?.toFixed(2) },
                { stat: "Low", value: low?.toFixed(2) },
              ]}
              columns={["stat", "value"]}
            />
          </>
        ) : (
          "Loading..."
        )}
      </>
    </Tile>
  );
};

export default StockQuoteTile;
