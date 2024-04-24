import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditItem.module.scss";
import EditOrder from "../../../components/Admin/EditItem/EditOrder";
import EditTicket from "../../../components/Admin/EditItem/EditTicket";
import EditBrand from "../../../components/Admin/EditItem/EditBrand";
import EditSneaker from "../../../components/Admin/EditItem/EditSneaker";
import EditRole from "../../../components/Admin/EditItem/EditRole";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { getItemById } from "../../../utils/apiUtilis";
import { IBrand } from "../../../interfaces/IBrand";
import { ITicket } from "../../../interfaces/ITicket";
import { ISneakerAdmin } from "../../../interfaces/ISneaker";
import { IRole } from "../../../interfaces/IRole";
import { orderItemsType } from "../../../constants/orderItemType";

function EditItem() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState();

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
    if (item) {
      switch (category) {
        case "orders":
          return <EditOrder order={item as orderItemsType} />;
        case "tickets":
          return <EditTicket ticket={item as ITicket} />;
        case "brands":
          return <EditBrand brand={item as IBrand} />;
        case "sneakers":
          return <EditSneaker sneaker={item} />;
        case "roles":
          return <EditRole role={item as IRole} />;
      }
    }
  };

  return (
    <section className={styles.editItem}>
      <div className={styles.backButton} onClick={handleBack}>
        <BiArrowBack />{" "}
        <span className={styles.editHeading}>Edit {category}</span>
      </div>
      {renderCategoryItem()}
    </section>
  );
}

export default EditItem;
