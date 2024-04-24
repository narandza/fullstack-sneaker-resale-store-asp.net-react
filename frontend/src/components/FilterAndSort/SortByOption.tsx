import { sortOptions } from "./FilterAndSortOptions";
import styles from "./FilterAndSortOptions.module.scss";

interface ISortByOption {
  options: sortOptions[];
  onSortChange: (selectedSortOption: number) => void;
  selectedSortOption: number;
}

function SortByOption({
  options,
  onSortChange,
  selectedSortOption,
}: ISortByOption) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    onSortChange(value);
  };

  return (
    <div className={styles.sortBy}>
      <p>sort by:</p>

      <select
        className={styles.sortByDropDown}
        onChange={handleSortChange}
        value={selectedSortOption}
      >
        <option value={0}> Select...</option>
        {options.map((option, index) => (
          <option
            value={option.id}
            key={index}
            className={styles.dropDownOption}
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByOption;
