import StockQuoteTile, {
  Tile,
  Tiles,
  Table,
  StockCurrentValue,
} from "../StockQuoteTile";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("StockQuoteTile components", () => {
  describe("Tile tests", () => {
    it("render children", () => {
      render(<Tile>Hi there</Tile>);
      expect(screen.getByText("Hi there")).toBeInTheDocument();
    });
    it("handle onClose", () => {
      const mockOnClose = jest.fn();
      render(<Tile onClose={mockOnClose}>Hi there</Tile>);
      userEvent.click(screen.getByRole("button", { name: "Close" }));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
  describe("Tiles tests", () => {
    it("render children", () => {
      render(
        <Tiles>
          <button aria-label="Child"></button>
          <button aria-label="Child2"></button>
        </Tiles>
      );
      expect(screen.getByRole("button", { name: "Child" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Child2" })
      ).toBeInTheDocument();
    });
  });
  describe("Table tests", () => {
    it("render row values", () => {
      render(
        <Table
          columns={["column1", "column2"]}
          rows={[{ column1: "column1Value", column2: "column2Value" }]}
        ></Table>
      );
      expect(
        screen.getByRole("cell", { name: "column1Value" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("cell", { name: "column2Value" })
      ).toBeInTheDocument();
    });
  });
  describe("StockCurrentValue", () => {
    it("no values yet", () => {
      render(<StockCurrentValue />);
      expect(screen.queryByText("%")).toBeNull();
    });
    it("render trend and current for up", () => {
      render(<StockCurrentValue current={100} trend={50} />);
      expect(screen.getByText("50.0%")).toBeInTheDocument();
      expect(screen.getByText("$100")).toBeInTheDocument();
      expect(screen.getByTitle("Trend Up")).toBeInTheDocument();
    });
    it("render trend and current for down", () => {
      render(<StockCurrentValue current={100} trend={-50} />);
      expect(screen.getByText("50.0%")).toBeInTheDocument();
      expect(screen.getByText("$100")).toBeInTheDocument();
      expect(screen.getByTitle("Trend Down")).toBeInTheDocument();
    });
  });
  describe("StockQuoteTile", () => {
    const mockStockName = "Stock name";
    const mockStockSymbol = "STCK";
    it("Still loading", () => {
      render(<StockQuoteTile name={mockStockName} />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: mockStockName })
      ).toBeInTheDocument();
    });
    it("Render current", () => {
      render(
        <StockQuoteTile
          name={mockStockName}
          current={100}
          trend={50}
          high={150}
          low={0}
        />
      );
      expect(screen.getByText("$100")).toBeInTheDocument();
      expect(screen.getByText("50.0%")).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "150.00" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "0.00" })).toBeInTheDocument();
    });
    it("Close tile", () => {
      const mockClose = jest.fn();
      render(
        <StockQuoteTile
          name={mockStockName}
          current={100}
          trend={50}
          high={150}
          low={0}
          symbol={mockStockSymbol}
          onClose={mockClose}
        />
      );
      const closeButton = screen.getByRole("button", { name: "Close" });
      expect(closeButton).toBeInTheDocument();
      userEvent.click(closeButton);
      expect(mockClose).toHaveBeenCalledWith(mockStockSymbol);
    });
  });
});
