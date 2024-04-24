import SampleImage from "../../assets/images/shoe-image.jpg";
import { ISneaker } from "../../interfaces/ISneaker";
import { getPath } from "../../utils/apiUtilis";
import styles from "./SingleProduct.module.scss";
import { BiTrash } from "react-icons/bi";

const sampleSneaker = {
  image: SampleImage,
  brand: "Nike",
  model: "Air Jordan 1 High OG",
  colorway: "Chigaco",
  price: "500.00",
  size: "8",
};

function SingleProduct(sneaker: any) {
  return (
    <div className={styles.productComponent}>
      <img
        src={
          sneaker.sneaker.images[0].path &&
          getPath(sneaker.sneaker.images[0].path)
        }
        alt={`${sneaker.model}`}
        className={styles.productImage}
      />
      <p
        className={styles.productHeading}
      >{`${sneaker.sneaker.brand.name} ${sneaker.sneaker.model}`}</p>
      <p className={styles.porductColorway}>{sneaker.sneaker.colorway}</p>
      <p className={styles.productPrice}>${sneaker.sneaker.price} USD</p>
    </div>
  );
}

export interface ISingleCartItem {
  item: {
    sneakerId: number;
    price: number;
    brand: string;
    model: string;
    colorway: string;
    imagePath: string;
  };
  onDelete?: (id: number) => void;
}

export function SingleCartItem({ item, onDelete }: ISingleCartItem) {
  const handleDeleteClick = () => {
    onDelete && onDelete(item.sneakerId);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemLeft}>
        <img
          src={item.imagePath && getPath(item.imagePath)}
          alt="sample"
          className={styles.cartItemImage}
        />
        <div className={styles.cartItemInfo}>
          <p
            className={styles.itemInfoHeading}
          >{`${item.brand}, ${item.model}`}</p>
          <p className={styles.itemInfoColorway}>{item.colorway}</p>
        </div>
      </div>
      <div className={styles.cartItemPriceAndAction}>
        <span className={styles.itemPrice}>${item.price} USD</span>
        {onDelete && (
          <BiTrash
            className={styles.itemDelete}
            size="1.5em"
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </div>
  );
}

export function SingleSearchItem({ sneaker }: { sneaker: ISneaker }) {
  return (
    <div className={styles.searchItem}>
      <div className={styles.itemImageContainer}>
        <img
          src={getPath(sneaker.images[0].path)}
          alt={sneaker.model + sneaker.colorway}
          className={styles.itemImage}
        />
      </div>
      <div className={styles.itemInfo}>
        <p
          className={styles.itemInfoHeading}
        >{`${sneaker.brand.name}, ${sneaker.model}`}</p>
        <p className={styles.itemInfoColorway}>{sneaker.colorway}</p>
        <span className={styles.itemPrice}>${sneaker.price} USD</span>
      </div>
    </div>
  );
}

export default SingleProduct;
