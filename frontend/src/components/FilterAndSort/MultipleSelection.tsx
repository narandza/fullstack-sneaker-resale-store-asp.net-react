import React, { useEffect, useState } from "react";
import styles from "./FilterAndSortOptions.module.scss";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface IMultipleSelection {
  heading: string;
  items: string[] | number[];
  onSelectionChange: (selectedItems: string[]) => void;
  initialSelected?: string[];
}

function MultipleSelection({
  heading,
  items,
  onSelectionChange,
  initialSelected = [],
}: IMultipleSelection) {
  const [optionOpen, setOptionOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>(initialSelected); // Initialize with initialSelected

  const toggleOptionOpen = () => {
    setOptionOpen(!optionOpen);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  useEffect(() => {
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]);

  return (
    <div className={styles.filterMultipleSelection}>
      <div className={styles.multipleSelectionField}>
        <p onClick={toggleOptionOpen}>{heading}</p>
        {!optionOpen && <BiChevronDown onClick={toggleOptionOpen} />}
        {optionOpen && <BiChevronUp onClick={toggleOptionOpen} />}
      </div>
      {optionOpen && (
        <div className={styles.multipleSelectionButtons}>
          {items.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className={styles.itemCheckBox}
                value={item.toString()}
                checked={selectedItems.includes(item.toString())}
                onChange={handleCheckboxChange}
              />
              <label className={styles.itemBtn}>{item}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultipleSelection;
