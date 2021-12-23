import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

type StockListSearchTypes = {
  /** options available for searching */
  options: string[];
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
            <ComboboxOption key={option} value={option} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default StockListSearch;
