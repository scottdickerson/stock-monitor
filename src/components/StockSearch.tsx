import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { StockList } from "../types/StockTypes";
import "./StockSearch.css";

type StockSearchTypes = {
  /** options available for searching */
  options: StockList;
  onSearch: (searchValue: string) => void;
  onSelect: (key: string) => void;
  disabled?: boolean;
};

const StockSearch = ({
  options,
  onSearch,
  onSelect,
  disabled = false,
}: StockSearchTypes): JSX.Element => {
  return (
    <Combobox
      className="StockSearch"
      aria-labelledby="Search Stocks"
      onSelect={onSelect}
    >
      <ComboboxInput
        disabled={disabled}
        onChange={(event) => onSearch(event.target.value)}
      />
      <ComboboxPopover>
        <ComboboxList>
          {options.map((option) => (
            <ComboboxOption
              key={option.symbol}
              value={option.symbol}
            ></ComboboxOption>
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default StockSearch;
