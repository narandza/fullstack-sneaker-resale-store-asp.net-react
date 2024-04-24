import { useEffect, useState } from "react";
import api from "../../../api/apiService";
import IUser from "../../../interfaces/IUser";
import styles from "./ShowItems.module.scss";
import OrderPreview from "../../OrderPreview/OrderPreview";
import { ITicket } from "../../../interfaces/ITicket";
import SingleTicket from "../../SingleTicket/SingleTicket";
import { orderItemsType } from "../../../constants/orderItemType";

interface IUserItem {
  user: IUser;
}

function UserItem({ user }: IUserItem) {
  const [userOrders, setUserOrders] = useState<orderItemsType[]>();
  const [userTickets, setUserTickets] = useState<ITicket[]>();

  const fetchUserOrders = async () => {
    if (user) {
      const response = await api.get(`/orders?email=${user.email}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        setUserOrders(response.data.items);
      }
    }
  };
  const fetchUserTickets = async () => {
    if (user) {
      const response = await api.get(`/tickets?userEmail=${user.email}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        setUserTickets(response.data.items);
      }
    }
  };

  useEffect(() => {
    fetchUserOrders();
    fetchUserTickets();
  }, []);

  return (
    <div className={styles.singleItem}>
      {user && (
        <div className={styles.user}>
          <h1 className={styles.userHeading}>
            {user.firstName} {user.lastName}
          </h1>
          <h2 className={styles.userHeading2}>{user.email}</h2>

          <p className={styles.userP}>
            Role: <span className={styles.userHighlight}>{user.roleName}</span>
          </p>

          <div className={styles.addressContainer}>
            <h3 className={styles.addressHeading}>Address:</h3>
            <p>Street address: {user.address.streetAddress}</p>
            <p>
              City: {user.address.city} {user.address.postalCode}
            </p>
          </div>

          <div className={styles.userOrders}>
            <h3>User orders:</h3>
            {userOrders && userOrders
              ? userOrders?.map((order, index) => {
                  if (order.orderStatus !== "Pending")
                    return (
                      <OrderPreview
                        order={order}
                        key={index}
                        expanded={false}
                      />
                    );
                  return <></>;
                })
              : "No orders to show"}
          </div>
          <div className={styles.userTickets}>
            <h3>User tickets:</h3>
            {userTickets && userTickets
              ? userTickets.map((ticket, index) => (
                  <SingleTicket ticket={ticket} key={index} />
                ))
              : "No tickets to show"}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserItem;
