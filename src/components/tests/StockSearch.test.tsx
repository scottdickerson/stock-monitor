import { render, screen } from "@testing-library/react";
import StockSearch from "../StockSearch";
import userEvent from "@testing-library/user-event";

const commonProps = {
  onSearch: jest.fn(),
  onSelect: jest.fn(),
  options: [],
};

const mockOptions = [{ name: "International", symbol: "IBM" }];

describe("StockSearch", () => {
  afterEach(() => {
    commonProps.onSearch.mockReset();
    commonProps.onSelect.mockReset();
  });
  it("renders no options", () => {
    render(<StockSearch {...commonProps} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    // no options exist
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });
  it("renders options", () => {
    render(<StockSearch {...commonProps} options={mockOptions} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    // one options exist
    expect(screen.getByText("IBM")).toBeInTheDocument();
  });
  it("test typing callback", () => {
    render(<StockSearch {...commonProps} options={mockOptions} />);
    const searchInputField = screen.getByRole("combobox");
    userEvent.type(searchInputField, "searchme");
    expect(commonProps.onSearch).toHaveBeenCalledWith("searchme");
  });
  it("test selection callback", () => {
    render(<StockSearch {...commonProps} options={mockOptions} />);
    const searchInputField = screen.getByRole("combobox");
    userEvent.type(searchInputField, "IB");

    // one options exist
    const ibmOption = screen.getByRole("option");

    expect(ibmOption).toBeInTheDocument();
    userEvent.click(ibmOption);
    expect(commonProps.onSelect).toHaveBeenCalledWith("IBM");
  });
  it("test disabled", () => {
    render(<StockSearch {...commonProps} disabled options={mockOptions} />);
    const searchInputField = screen.getByRole("combobox");
    userEvent.type(searchInputField, "searchme");
    expect(commonProps.onSearch).not.toHaveBeenCalledWith("searchme");
  });
});
