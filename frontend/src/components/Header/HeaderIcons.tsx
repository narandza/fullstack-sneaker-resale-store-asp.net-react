import { BiSearch, BiShoppingBag, BiUser } from "react-icons/bi";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/apiService";

function HeaderIcons() {
  const isLoggedIn = localStorage.getItem("token");
  const iconSize = "1.1em";
  const [cartItemsNumber, setCartItemsNumber] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const getCartItemsNumber = async () => {
      const response = await api.get(
        `/orders?email=${localStorage.getItem(
          "userEmail"
        )}&orderStatus=Pending`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        response.data.totalCount !== 0
          ? setCartItemsNumber(response.data.items[0].items.length)
          : setCartItemsNumber(0);
      }
    };

    if (isLoggedIn) {
      getCartItemsNumber();
    }
  }, [isLoggedIn, location.pathname]);

  return (
    <div className={styles.headerIcons}>
      <Link to="/search">
        <BiSearch size={iconSize} className={styles.icon} />
      </Link>
      <Link to="/cart" className={styles.cartLink}>
        <BiShoppingBag size={iconSize} className={styles.icon} />
        {isLoggedIn && cartItemsNumber !== 0 && (
          <span className={styles.cartItemsNumber}>{cartItemsNumber}</span>
        )}
      </Link>
      <Link to={isLoggedIn ? "/profile" : "/login"}>
        <BiUser size={iconSize} className={styles.icon} />
      </Link>
    </div>
  );
}

export default HeaderIcons;
