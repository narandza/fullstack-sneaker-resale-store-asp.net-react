import styles from "./Button.module.scss";
import classNames from "classnames";

interface IButton {
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: (param?: any) => void;
}

interface ISizeButton extends IButton {
  size: string;
  isSelected?: boolean;
  onSelect?: (size: string) => void;
}

function MainButton({ text, className, type, disabled, onClick }: IButton) {
  const mainButtonClass = classNames(styles.mainButton, className);

  const handleClick = () => {
    if (onClick && typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <button
      className={mainButtonClass}
      type={type}
      disabled={disabled && disabled}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export function SizeButton({
  size,
  className,
  onSelect,
  isSelected,
}: ISizeButton) {
  const sizeButtonClass = classNames(styles.sizeButton, className, {
    [styles.selected]: isSelected,
  });

  const handleClick = () => {
    if (onSelect && typeof onSelect === "function") {
      onSelect(size);
    }
  };

  return (
    <button className={sizeButtonClass} onClick={handleClick}>
      {size}
    </button>
  );
}

export default MainButton;
