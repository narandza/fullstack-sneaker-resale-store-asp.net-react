import { IBrand } from "../../../interfaces/IBrand";
import { getPath } from "../../../utils/apiUtilis";
import styles from "./ShowItems.module.scss";

interface IBrandItem {
  brand: IBrand;
}

function BrandItem({ brand }: IBrandItem) {
  return (
    <div className={styles.singleItem}>
      {brand && (
        <div className={styles.brand}>
          <h1 className={styles.brandName}>{brand.name}</h1>
          <img
            src={getPath(brand.logo.path)}
            alt={brand.name + brand.id}
            className={styles.brandLogo}
          />
          <div className={styles.descriptionContainer}>
            <h2 className={styles.descriptionHeading}>Description:</h2>
            <p className={styles.brandDescrption}>{brand.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrandItem;
