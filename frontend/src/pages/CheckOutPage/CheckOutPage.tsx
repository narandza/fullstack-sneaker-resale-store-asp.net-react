import { BiCreditCard, BiMoney } from "react-icons/bi";
import styles from "./CheckOutPage.module.scss";
import { IconType } from "react-icons";
import MainButton from "../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import OrderPreview from "../../components/OrderPreview/OrderPreview";
import { useState } from "react";
import { InfoModal } from "../../components/Modal/Modals";
import api from "../../api/apiService";
import { toast } from "react-toastify";
import { orderItemsType } from "../../constants/orderItemType";

const paymentMethodData: {
  name: string;
  icon: IconType;
}[] = [
  {
    name: "Card",
    icon: BiCreditCard,
  },
  {
    name: "Cash",
    icon: BiMoney,
  },
];

function CheckOutPage() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const order: orderItemsType = location.state;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  if (!order) {
    navigate("/cart");
  }

  const handlePlaceOrder = async () => {
    if (selectedPaymentMethod === null) {
      setModalOpen(true);
      setModalContent("Please select payment method");
    }

    try {
      const response = await api.put(
        `/orders/${order.id}`,
        {
          paymentMethod: selectedPaymentMethod === "Cash" ? 1 : 0,
          paymentStatus: selectedPaymentMethod === "Card" ? 1 : 0,
          orderStatus: 1,
          items: order.items.map((item) => ({ sneakerId: (item as any).id })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Order placed.", {
          onClose: () => {
            navigate("/");
          },
        });
      } else if (response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.checkOut}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Checkout</h1>
      </div>
      <div className={styles.checkOutContent}>
        <div className={styles.orderPreviewContainer}>
          <OrderPreview order={order} expanded={true} />
        </div>
        <div className={styles.paymentMethod}>
          <h2 className={styles.paymentMethodHeading}>Select payment method</h2>
          <div className={styles.methodsContainer}>
            {paymentMethodData.map((item, index) => (
              <div className={styles.singleMethod} key={index}>
                <span className={styles.methodName}>{item.name}:</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={index}
                  checked={selectedPaymentMethod === item.name}
                  onChange={() => setSelectedPaymentMethod(item.name)}
                />
                <item.icon size="4em" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.shippingPreview}>
          <h2>Shipping information:</h2>
          <div className={styles.shippingInfo}>
            <p>
              Recipient:{" "}
              <span className={styles.infoData}> {order.user.name}</span>
            </p>
            <p>
              Address:{" "}
              <span className={styles.infoData}>{order.user.address}</span>
            </p>
          </div>
        </div>
        <div className={styles.orderButtonContainer}>
          <MainButton
            text="place order"
            className={styles.orderButton}
            onClick={handlePlaceOrder}
          />
        </div>
      </div>
      <InfoModal
        isOpen={modalOpen}
        heading={modalContent}
        onAccept={() => {
          setModalOpen(!modalOpen);
        }}
      />
    </section>
  );
}

export default CheckOutPage;
