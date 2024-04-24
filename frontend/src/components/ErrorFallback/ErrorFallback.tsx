import styles from "./ErrorFallback.module.scss";
import { BiSolidError } from "react-icons/bi";

function ErrorFallback() {
  return (
    <div className={styles.errorFallback}>
      <BiSolidError size="5em" color="red" />
      <div className={styles.errorMessage}>
        Something went wrong. Please try again later.
      </div>
    </div>
  );
}

export default ErrorFallback;
