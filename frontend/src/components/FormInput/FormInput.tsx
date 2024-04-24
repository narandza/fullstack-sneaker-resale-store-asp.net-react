import classNames from "classnames";
import styles from "./FormInput.module.scss";
import { checkBoxType } from "../../constants/UseCases";

interface IFormInput {
  type:
    | "text"
    | "password"
    | "email"
    | "textarea"
    | "file"
    | "number"
    | "date"
    | "select"
    | "checkbox";
  name?: string;
  placeholder?: string;
  multiple?: boolean;
  value?: string | number | Date | string[] | undefined | any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function FormInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  multiple,
}: IFormInput) {
  if (type === "date") {
    const formattedDate = value
      ? new Date(value).toISOString().split("T")[0]
      : "";

    return (
      <input
        type="date"
        name={name}
        className={styles.formInput}
        value={formattedDate}
        onChange={onChange}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={styles.formInput}
      value={value as string}
      multiple={multiple ? true : false}
      onChange={
        onChange as (event: React.ChangeEvent<HTMLInputElement>) => void
      }
      onBlur={onBlur as (event: React.FocusEvent<HTMLInputElement>) => void}
    />
  );
}

interface ITextArea {
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({
  name,
  placeholder,
  value,
  onChange,
  className,
  onBlur,
}: ITextArea) {
  const mainButtonClass = classNames(styles.textarea, className);

  return (
    <textarea
      className={mainButtonClass}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

interface ICheckbox {
  name?: string;
  placeholder?: string;
  options: checkBoxType[];
  checkedValues: number[];
  onCheckChange: (checkedItems: number[]) => void;
}

export function Checkbox({
  name,
  options,
  checkedValues,
  onCheckChange,
}: ICheckbox) {
  const handleCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: checkBoxType
  ) => {
    let updatedCheckedValues: number[];

    if (option.mandatory) {
      updatedCheckedValues = [...checkedValues, option.id];
    } else {
      if (e.target.checked) {
        updatedCheckedValues = [...checkedValues, option.id];
      } else {
        updatedCheckedValues = checkedValues.filter((id) => id !== option.id);
      }
    }

    onCheckChange(updatedCheckedValues);
  };

  return (
    <div className={styles.checkboxContainer}>
      {options.map((option) => (
        <div className={styles.checkbox} key={option.id}>
          <input
            type="checkbox"
            name={name}
            value={option.id}
            checked={checkedValues.includes(option.id)}
            onChange={(e) => handleCheckChange(e, option)}
            disabled={option.mandatory}
          />
          <label>{option.name}</label>
        </div>
      ))}
    </div>
  );
}
