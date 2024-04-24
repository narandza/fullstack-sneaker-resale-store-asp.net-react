import { useEffect, useState } from "react";
import styles from "./FilterData.module.scss";
import api from "../../../api/apiService";
import { IBrand } from "../../../interfaces/IBrand";
import { filterOptions } from "../../../constants/AdminFilterOptions";

interface IFilterData {
  options: filterOptions[];
  onFilter: (params: Record<string, string>) => void;
}

function FilterData({ options, onFilter }: IFilterData) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [selectData, setSelectData] = useState<IBrand[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (options) {
      options.forEach((option) => {
        if (option.type === "select" && option.name === "brand") {
          api.get(`/${option.name}s`).then((response) => {
            setSelectData(response.data.items);
          });
        }
      });
    }
  }, [options]);

  return (
    <div className={styles.filterData}>
      {options.map((option, index) => (
        <div className={styles.optionContainer} key={index}>
          <label className={styles.label}>{option.name}:</label>
          {option.type === "search" && (
            <input
              type="search"
              className={styles.optionInput}
              name={option.name}
              onChange={handleChange}
            />
          )}
          {option.type === "select" && (
            <select
              name={option.name}
              onChange={handleChange}
              className={styles.optionInput}
            >
              <option value="0"> Select {option.name}...</option>
              {selectData && option.name === "brand"
                ? selectData.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))
                : option.options &&
                  option.options.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
            </select>
          )}
          {option.type === "date" && (
            <input
              type="date"
              name={option.name}
              onChange={handleChange}
              className={styles.optionInput}
            />
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <button
          onClick={() => onFilter(filterValues)}
          className={styles.filterButton}
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default FilterData;
