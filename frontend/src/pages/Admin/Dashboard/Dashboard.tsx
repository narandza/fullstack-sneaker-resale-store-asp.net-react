import DashboardItem from "../../../components/Admin/DashboardItem/DashboardItem";
import styles from "./Dashboard.module.scss";
import { PiSneaker } from "react-icons/pi";
import {
  BiCategoryAlt,
  BiUser,
  BiPackage,
  BiNotepad,
  BiMedal,
} from "react-icons/bi";
import { IconType } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { checkIfUserIsAdmin } from "../../../utils/userUtilis";

type dashboardItems = {
  name: string;
  icon: IconType;
  useCase: number;
};

const items: dashboardItems[] = [
  {
    name: "sneakers",
    icon: PiSneaker,
    useCase: 11,
  },
  {
    name: "brands",
    icon: BiCategoryAlt,
    useCase: 21,
  },
  {
    name: "users",
    icon: BiUser,
    useCase: 41,
  },
  {
    name: "roles",
    icon: BiMedal,
    useCase: 51,
  },
  {
    name: "orders",
    icon: BiPackage,
    useCase: 71,
  },
  {
    name: "tickets",
    icon: BiNotepad,
    useCase: 91,
  },
];
function AdminDashboard() {
  const isAdmin = checkIfUserIsAdmin();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userUseCases = JSON.parse(localStorage.getItem("userUseCases") ?? "[]");

  const filteredDashboardItems = items.filter((item) =>
    userUseCases.includes(item.useCase)
  );

  if (!isAdmin) {
    navigate("/");
  }

  return (
    <section className={styles.dashboard}>
      {isAdmin && (
        <>
          <h1 className={styles.dashboardHeading}>
            welcome back,{" "}
            <span className={styles.headingEmail}>{userEmail}</span>
          </h1>
          <div className={styles.dashboardItems}>
            {filteredDashboardItems.map((item, index) => {
              return (
                <Link to={item.name} key={index}>
                  <DashboardItem text={item.name} icon={item.icon} />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default AdminDashboard;
