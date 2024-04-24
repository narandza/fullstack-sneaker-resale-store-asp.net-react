import { useEffect, useState } from "react";
import OrderPreview from "../../OrderPreview/OrderPreview";
import styles from "./Orders.module.scss";
import api from "../../../api/apiService";
import IUser from "../../../interfaces/IUser";
import { orderItemsType } from "../../../constants/orderItemType";

interface IOrders {
  user: IUser;
}

function Orders({ user }: IOrders) {
  const [orders, setOrders] = useState<orderItemsType[]>();

  const getUserOrders = async () => {
    try {
      const response = await api.get(`/orders?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setOrders(response.data.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <section className={styles.orders}>
      {orders ? (
        orders.map((order, index) => {
          if (order.orderStatus !== "Pending") {
            return <OrderPreview order={order} key={index} expanded={false} />;
          }
          return (
            <span className={styles.noOrder} key={index}>
              No orders to show
            </span>
          );
        })
      ) : (
        <span className={styles.noOrder}>No orders to show</span>
      )}
    </section>
  );
}
export default Orders;
