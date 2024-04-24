import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loader;
