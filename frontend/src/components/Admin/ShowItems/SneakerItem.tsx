import { ISneakerAdmin } from "../../../interfaces/ISneaker";
import { SizeButton } from "../../Button/Button";
import ProductImageCollection from "../../ProductImageCollection/ProductImageCollection";
import styles from "./ShowItems.module.scss";

interface ISneakerItem {
  sneaker: ISneakerAdmin;
}

function SneakerItem({ sneaker }: ISneakerItem) {
  const dataEntries: { title: string; value: string }[] = [
    {
      title: "Relased on",
      value:
        sneaker && new Date(sneaker.releaseDate).toLocaleDateString("en-GB"),
    },
    {
      title: "Price",
      value: sneaker && `${sneaker.price}`,
    },
    {
      title: "Description",
      value: sneaker && sneaker.description,
    },
  ];

  return (
    <div className={styles.singleItem}>
      {sneaker && (
        <div className={styles.sneaker}>
          <h1 className={styles.sneakerHeading}>
            {sneaker.brand.name} {sneaker.model}
          </h1>
          <h2 className={styles.sneakerHeading2}>{sneaker.colorway}</h2>
          <div className={styles.sneakerData}>
            <div className={styles.imagesContainer}>
              <ProductImageCollection images={sneaker.images} />
            </div>
            <div className={styles.sneakerInfo}>
              {dataEntries.map((entry, index) => (
                <p className={styles.sneakerP} key={index}>
                  <span className={styles.entryTitle}>{entry.title}: </span>
                  <span className={styles.entryValue}>{entry.value}</span>
                </p>
              ))}

              <div className={styles.sizeContainer}>
                <h3 className={styles.sizeHeading}>Sizes avaiable</h3>
                {sneaker.sizes.map((size) => (
                  <SizeButton size={size} className={styles.sizeButton} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SneakerItem;
