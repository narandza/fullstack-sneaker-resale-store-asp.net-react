import styles from "./DashboardItem.module.scss";
import { IconType } from "react-icons";

interface IDashboardItem {
  text: string;
  icon: IconType;
}

function DashboardItem({ text, icon: Icon }: IDashboardItem) {
  const iconSize = "5em";
  return (
    <div className={styles.dashboardItem}>
      <span className={styles.itemText}>{text}</span>
      <div className={styles.iconWrapper}>
        {Icon && <Icon className={styles.icon} size={iconSize} />}
      </div>
    </div>
  );
}

export default DashboardItem;
