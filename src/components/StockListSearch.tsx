import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { StockList } from "../types/StockTypes";

type StockListSearchTypes = {
  /** options available for searching */
  options: StockList;
  onSearch: (searchValue: string) => void;
  onSelect: (key: string) => void;
};

const StockListSearch = ({
  options,
  onSearch,
  onSelect,
}: StockListSearchTypes): JSX.Element => {
  return (
    <Combobox aria-labelledby="Search Stocks" onSelect={onSelect}>
      <ComboboxInput onChange={(event) => onSearch(event.target.value)} />
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

export default StockListSearch;
