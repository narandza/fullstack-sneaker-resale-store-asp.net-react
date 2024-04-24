import { useNavigate, useParams } from "react-router-dom";
import styles from "./ShowItem.module.scss";
import { useEffect, useState } from "react";
import { IBrand } from "../../../interfaces/IBrand";
import { ISneakerAdmin } from "../../../interfaces/ISneaker";
import IUser from "../../../interfaces/IUser";
import { IRole } from "../../../interfaces/IRole";
import { ITicket } from "../../../interfaces/ITicket";
import BrandItem from "../../../components/Admin/ShowItems/BrandItem";
import SneakerItem from "../../../components/Admin/ShowItems/SneakerItem";
import OrderItem from "../../../components/Admin/ShowItems/OrderItem";
import RoleItem from "../../../components/Admin/ShowItems/RoleItem";
import TicketItem from "../../../components/Admin/ShowItems/TicketItem";
import UserItem from "../../../components/Admin/ShowItems/UserItem";
import { BiArrowBack } from "react-icons/bi";
import { getItemById } from "../../../utils/apiUtilis";
import { orderItemsType } from "../../../constants/orderItemType";

function ShowItem() {
  const { category, id } = useParams();
  const [item, setItem] = useState<
    IBrand | ISneakerAdmin | IUser | IRole | ITicket | orderItemsType
  >();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/dashboard/${category}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (category && id) {
        try {
          const itemData = await getItemById(category, id);
          setItem(itemData);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [category, id]);

  const renderCategoryItem = () => {
    switch (category) {
      case "brands":
        return <BrandItem brand={item as IBrand} />;
      case "sneakers":
        return <SneakerItem sneaker={item as ISneakerAdmin} />;
      case "users":
        return <UserItem user={item as IUser} />;
      case "roles":
        return <RoleItem role={item as IRole} />;
      case "orders":
        return <OrderItem order={item as orderItemsType} />;
      case "tickets":
        return <TicketItem ticket={item as ITicket} />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.showItem}>
      <div className={styles.backButton} onClick={handleBack}>
        <BiArrowBack />
      </div>
      {id && category && renderCategoryItem()}
    </section>
  );
}

export default ShowItem;
