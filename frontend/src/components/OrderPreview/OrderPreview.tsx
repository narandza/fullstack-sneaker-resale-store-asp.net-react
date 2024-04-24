import { useState } from "react";
import { SingleCartItem } from "../SingleProduct/SingleProduct";
import styles from "./OrderPreview.module.scss";
import { orderItemsType } from "../../constants/orderItemType";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  enumConversion,
} from "../../constants/orders";
import { getEnumValue } from "../../utils/enumUtils";

interface IOrderPreview {
  order: orderItemsType;
  expanded: boolean;
}

function OrderPreview({ order, expanded }: IOrderPreview) {
  const [expandedPreview, setExpandedPreview] = useState(expanded);
  console.log(order);
  const toggleExpanded = () => {
    setExpandedPreview(!expandedPreview);
  };

  return (
    <div className={styles.orderPreview}>
      {order.orderStatus !== "Pending" && (
        <h1 className={styles.heading}>
          Order status:{" "}
          <span className={styles.orderStatus}>{order.orderStatus}</span>
        </h1>
      )}

      {order.orderStatus !== "Pending" && (
        <div className={styles.orderInfo}>
          <p>
            Order placed on:{" "}
            {new Date(order.createdAt).toLocaleDateString("en-GB")}
          </p>
          <p>Payment method: {order.paymentMethod} </p>
          {order.orderStatus !== "1" && (
            <p>Payment status: {order.paymentStatus} </p>
          )}
          <p>Name: {order.user.name} </p>
          <p>Address: {order.user.address}</p>
        </div>
      )}
      {expandedPreview ? (
        <div className={styles.orderItems}>
          {order.items.map((item, index) => (
            <SingleCartItem item={item} key={index} />
          ))}
          <hr />
          <p>
            Total: <span className={styles.orderTotal}> ${order.total}</span>
          </p>
        </div>
      ) : (
        <div className={styles.smallPreview}>
          <p>
            Number of items:{" "}
            <span className={styles.value}>{order.items.length}</span>
          </p>
          <p>
            Total: <span className={styles.value}>{order.total}</span>
          </p>
        </div>
      )}
      <button onClick={toggleExpanded} className={styles.expandButton}>
        {expandedPreview ? "Close" : "Show details"}
      </button>
    </div>
  );
}

export default OrderPreview;
