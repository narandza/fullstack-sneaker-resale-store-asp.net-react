import styles from "./CartPage.module.scss";
import { SingleCartItem } from "../../components/SingleProduct/SingleProduct";
import MainButton from "../../components/Button/Button";
import { useEffect, useState } from "react";
import api from "../../api/apiService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { orderItemsType } from "../../constants/orderItemType";

function CartPage() {
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState<orderItemsType>();

  const handleDelete = async (id: number) => {
    console.log(id);
    try {
      const response = await api.delete(`/orders/orderitem/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        toast.success("Item removed");
        getCartItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCartItems = async () => {
    try {
      const response = await api.get(
        `/orders?email=${localStorage.getItem(
          "userEmail"
        )}&orderStatus=Pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartItems(response.data.items[0]);
      }
    } catch {}
  };

  useEffect(() => {
    getCartItems();
  }, []);
  console.log(cartItems);
  return (
    <section className={styles.cart}>
      <h1 className={styles.cartHeader}> your cart</h1>
      {cartItems ? (
        <>
          <div className={styles.cartItems}>
            {cartItems.items.map((item, index) => (
              <>
                <SingleCartItem
                  key={index}
                  item={item}
                  onDelete={() => handleDelete((item as any).id)}
                />
              </>
            ))}
          </div>
          <div className={styles.cartTotal}>
            <h2>Total:</h2>
            <span className={styles.totalPrice}>${cartItems.total} USD</span>
          </div>
          <Link to="/checkout" state={cartItems}>
            <MainButton text="check out" className={styles.checkOutBtn} />
          </Link>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <h2>Cart is empty</h2>
          <p>Head to shop to add items</p>
        </div>
      )}
    </section>
  );
}

export default CartPage;
