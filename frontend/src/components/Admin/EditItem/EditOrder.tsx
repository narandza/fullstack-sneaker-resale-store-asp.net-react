import { useState } from "react";
import { ordersFilterOptions } from "../../../constants/AdminFilterOptions";
import MainButton from "../../Button/Button";
import styles from "./EditItem.module.scss";
import api from "../../../api/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IOrder } from "../../../interfaces/IOrder";
import { orderItemsType } from "../../../constants/orderItemType";

interface IEditOrder {
  order: orderItemsType;
}

function EditOrder({ order }: IEditOrder) {
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState<IOrder>({
    id: order.id,
    orderStatus: parseInt(order.orderStatus),
    paymentMethod: parseInt(order.paymentMethod),
    paymentStatus: parseInt(order.orderStatus),
    items: order.items.map((orderItem) => ({
      id: orderItem.sneakerId,
    })),
  });

  const paymentStatuses = ordersFilterOptions.find(
    (item) => item.name === "paymentStatus"
  );
  const orderStatuses = ordersFilterOptions.find(
    (item) => item.name === "orderStatus"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    const newValue = e.target.value;
    setOrderData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(order);
    console.log(orderData);
    try {
      const response = await api.put(`/orders/${order.id}`, orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        toast.success(`Order updated.`, {
          onClose: () => {
            navigate("/dashboard/orders");
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.updateForm} onSubmit={handleSubmit}>
      <div className={styles.formItem}>
        <label>Update payment status</label>
        <select
          onChange={(e) => handleChange(e, "paymentStatus")}
          value={orderData.paymentStatus}
          className={styles.formSelect}
        >
          {paymentStatuses?.options?.map((status) => (
            <option key={status.value} value={status.value}>
              {status.name}
            </option>
          ))}
        </select>
        <span className={styles.inputError}></span>
      </div>
      <div className={styles.formItem}>
        <label>Update order status</label>
        <select
          onChange={(e) => handleChange(e, "orderStatus")}
          value={orderData.orderStatus}
          className={styles.formSelect}
        >
          {orderStatuses?.options?.map((status) => (
            <option key={status.value} value={status.value}>
              {status.name}
            </option>
          ))}
        </select>
        <span className={styles.inputError}></span>
      </div>
      <div className={styles.formButton}>
        <span className={styles.inputError}></span>
        <MainButton text="Update" type="submit" />
      </div>
    </form>
  );
}

export default EditOrder;
