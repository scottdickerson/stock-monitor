import { normalizeChartData } from "../TimeBasedLineChart";

describe("TimeBasedLineChart", () => {
  const mockData = [
    {
      name: "IBM",
      data: [{ reportedEPS: 3.5, fiscalDateEnding: 1640626227000 }],
    },
    {
      name: "AAL",
      data: [
        { reportedEPS: 6.1, fiscalDateEnding: 1640626227000 },
        { reportedEPS: 6.2, fiscalDateEnding: 1640712627000 },
      ],
    },
  ];
  it("normalizeChartData", () => {
    expect(
      normalizeChartData(mockData, "fiscalDateEnding", "reportedEPS")
    ).toEqual([
      { fiscalDateEnding: "12/27/2021", IBM: 3.5, AAL: 6.1 },
      { fiscalDateEnding: "12/28/2021", AAL: 6.2 },
    ]);
  });
});
