import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import "./TimeBasedLineChart.css";

type APIData = { name: string; data: Record<string, any> }[];

type TimeBasedLineChartTypes = {
  xaxis?: string;
  yaxis?: string;
  label: string;
  data?: APIData;
};

/**
 * Normalizes the data to a form the Rechart can understand for
 * multi-series
 * @param data
 * @param xaxis
 */
export const normalizeChartData = (
  data: APIData = [],
  xaxis: string = "time",
  yaxis: string = "value"
) => {
  // we're building up a unique set of timestamps with each value
  const normalizedDataPointsForEachTimestamp: Record<string, any> = {};
  data.forEach((stock) => {
    stock.data?.forEach((datum: Record<string, any>) => {
      normalizedDataPointsForEachTimestamp[datum[xaxis]] = {
        [stock.name]: datum[yaxis],
        ...normalizedDataPointsForEachTimestamp[datum[xaxis]],
      };
    });
  });

  console.log("normalized data", normalizedDataPointsForEachTimestamp);
  return Object.keys(normalizedDataPointsForEachTimestamp).map((key) => ({
    [xaxis]: new Date(parseInt(key)).toLocaleDateString(),
    ...normalizedDataPointsForEachTimestamp[key],
  }));
};

const LINE_COLORS = ["#6929c4", "#009d9a", "#ee5396"];

const TimeBasedLineChart = ({
  xaxis,
  yaxis,
  label,
  data = [],
}: TimeBasedLineChartTypes) => {
  const normalizedChartData = useMemo(
    () => normalizeChartData(data, xaxis, yaxis),
    [data, xaxis, yaxis]
  );
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="TimeChart">
      <h2>{label}</h2>
      <ResponsiveContainer width="60%" height="60%">
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          data={normalizedChartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xaxis} />
          <YAxis tickFormatter={(value) => `${formatter.format(value)}`} />
          <Tooltip formatter={(value: any) => `${formatter.format(value)}`} />
          <Legend />
          {data?.map((stock, index) => (
            <Line
              key={stock.name}
              type="monotone"
              stroke={LINE_COLORS[index]}
              dataKey={stock.name}
              name={stock.name}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeBasedLineChart;
