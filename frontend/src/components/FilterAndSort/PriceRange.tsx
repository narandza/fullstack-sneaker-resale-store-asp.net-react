import styles from "./FilterAndSortOptions.module.scss";

interface IPriceRange {
  min: number;
  max: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

function PriceRange({
  min,
  max,
  onMinPriceChange,
  onMaxPriceChange,
}: IPriceRange) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (!isNaN(newMin) && newMin <= max && newMin) {
      onMinPriceChange(newMin);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (!isNaN(newMax)) {
      onMaxPriceChange(newMax);
    }
  };

  return (
    <div className={styles.filterPriceRange}>
      <p>price range</p>
      <div className={styles.priceRangePriceInput}>
        <div className={styles.priceInputField}>
          <span>min</span>
          <input
            type="number"
            value={min}
            className={styles.inputPrice}
            onChange={handleMinChange}
          />
        </div>
        <div className={styles.priceInputField}>
          <span>max</span>
          <input
            type="number"
            value={max}
            className={styles.inputPrice}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PriceRange;
