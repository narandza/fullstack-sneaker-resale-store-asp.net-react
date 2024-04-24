import styles from "./FilterAndSortOptions.module.scss";
import PriceRange from "./PriceRange";
import MultipleSelection from "./MultipleSelection";
import SortByOption from "./SortByOption";
import { useState, useEffect } from "react";
import { sizesUS } from "../../constants/sizes";
import { IBrand } from "../../interfaces/IBrand";

export type filterValues = {
  minPrice?: number;
  maxPrice?: number;
  selectedSizes?: string[];
  selectedBrands?: string[];
  sortType?: number;
};
interface IFilterAndSortOption {
  onFilterChange: (query: string) => void;
  brands: IBrand[];
  initialFilters: filterValues;
  setInitialValues: (selectedFilterVales: filterValues) => void;
}

export type sortOptions = {
  id: number;
  text: string;
};

function FilterAndSortOptions({
  onFilterChange,
  brands,
  initialFilters,
  setInitialValues,
}: IFilterAndSortOption) {
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 0);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialFilters.selectedSizes || []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialFilters.selectedBrands || []
  );
  const [sortType, setSortType] = useState<number>(
    initialFilters.sortType || 0
  );
  const sizes = sizesUS;

  const sortOptions: sortOptions[] = [
    { id: 1, text: "newest" },
    { id: 2, text: "price ascending" },
    { id: 3, text: "price descending" },
  ];

  const handleApply = () => {
    const queryParams = [];

    if (minPrice !== 0) {
      queryParams.push(`priceFrom=${minPrice}`);
    }

    if (maxPrice !== 0) {
      queryParams.push(`priceTo=${maxPrice}`);
    }

    if (selectedSizes.length > 0) {
      queryParams.push(`sizes=${selectedSizes.join(",")}`);
    }

    if (selectedBrands.length > 0) {
      queryParams.push(`brands=${selectedBrands.join(",")}`);
    }

    if (sortType !== 0) {
      queryParams.push(`sort=${sortType}`);
    }

    const selectedValues: filterValues = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      selectedBrands: selectedBrands,
      selectedSizes: selectedSizes,
      sortType: sortType,
    };

    setInitialValues(selectedValues);

    const queryString = queryParams.join("&");
    onFilterChange(queryString);
  };

  useEffect(() => {
    setMinPrice(initialFilters.minPrice || 0);
    setMaxPrice(initialFilters.maxPrice || 0);
    setSelectedSizes(initialFilters.selectedSizes || []);
    setSelectedBrands(initialFilters.selectedBrands || []);
    setSortType(initialFilters.sortType || 0);
  }, [initialFilters]);

  const handleReset = () => {
    setInitialValues({
      minPrice: 0,
      maxPrice: 0,
      selectedBrands: [],
      selectedSizes: [],
      sortType: 0,
    });

    onFilterChange("");
  };

  const filterButtons: {
    text: string;
    action: () => void;
  }[] = [
    {
      text: "Apply filters",
      action: handleApply,
    },
    {
      text: "Reset filters",
      action: handleReset,
    },
  ];

  return (
    <div className={styles.fsOptions}>
      <PriceRange
        min={minPrice}
        max={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />
      <MultipleSelection
        heading="size"
        items={sizes.map((size) => size.id)}
        onSelectionChange={setSelectedSizes}
        initialSelected={initialFilters.selectedSizes || []}
      />
      <MultipleSelection
        heading="brand"
        items={brands.map((brand) => brand.name)}
        onSelectionChange={setSelectedBrands}
        initialSelected={initialFilters.selectedBrands || []}
      />
      <hr className={styles.fsHorizontalLine} />
      <SortByOption
        options={sortOptions}
        onSortChange={setSortType}
        selectedSortOption={sortType}
      />
      <div className={styles.buttonsContainer}>
        {filterButtons.map((button, index) => (
          <button
            className={styles.filterButton}
            onClick={button.action}
            key={index}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterAndSortOptions;
