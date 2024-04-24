import { orderItemsType } from "../../../constants/orderItemType";
import OrderPreview from "../../OrderPreview/OrderPreview";
import styles from "./ShowItems.module.scss";

interface IOrderItem {
  order: orderItemsType;
}

function OrderItem({ order }: IOrderItem) {
  return (
    <div className={styles.singleItem}>
      {order && (
        <>
          <OrderPreview order={order} expanded />
        </>
      )}
    </div>
  );
}

export default OrderItem;
