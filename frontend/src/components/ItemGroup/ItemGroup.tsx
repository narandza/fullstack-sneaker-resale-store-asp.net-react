import styles from "./ItemGroup.module.scss";
import SingleProduct from "../SingleProduct/SingleProduct";
import { SizeButton } from "../Button/Button";
import { Link } from "react-router-dom";
import { ISize } from "../../interfaces/ISize";
import { getPath } from "../../utils/apiUtilis";

// import nikelogo from "../../assets/images/nike-logo.png";

interface IItemGroup {
  heading: string;
  type: "product" | "size" | "brand";
  items: object | ISize[] | null;
  navigateToShop?: (item: any) => void;
}

function ItemGroup({ heading, items, type, navigateToShop }: IItemGroup) {
  let groupItems: JSX.Element[] | null = null;
  if (Array.isArray(items)) {
    groupItems = items.map((item, index) => {
      switch (type) {
        case "product":
          return (
            <Link to={`/shop/${item.id}`} key={index}>
              <SingleProduct sneaker={item} />
            </Link>
          );
        case "size":
          return (
            <Link
              to={`/shop?size=${item}`}
              key={index}
              className={styles.sizeLink}
            >
              <SizeButton size={item} key={index}></SizeButton>
            </Link>
          );
        case "brand":
          return (
            <Link
              to={`/shop?brand=${item.name}`}
              key={index}
              className={styles.brandLink}
            >
              <img
                src={getPath(item.logo.path)}
                alt={`Logo of ${item.name}`}
                className={styles.brandLogo}
                key={index}
              />
            </Link>
          );
        default:
          return <></>;
      }
    });
  }
  const groupTypeClassName = `${type}Group`;

  return (
    <section className={styles.homePageSection}>
      <h1 className={styles.groupHeading}>{heading}</h1>
      <div className={styles[groupTypeClassName]}>{groupItems}</div>
    </section>
  );
}

export default ItemGroup;
