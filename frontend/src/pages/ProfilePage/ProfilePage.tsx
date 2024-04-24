import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";
import api from "../../api/apiService";
import IUser from "../../interfaces/IUser";
import { BiChevronDown, BiChevronUp, BiLogOut } from "react-icons/bi";
import UserInfo from "../../components/Profile/UserInfo/UserInfo";
import Orders from "../../components/Profile/Orders/Orders";
import ChangePassword from "../../components/Profile/ChangePassword/ChangePassword";
import Tickets from "../../components/Profile/Tickets/Tickets";
import Favorites from "../../components/Profile/Favorites/Favorites";

const profileSections: {
  name: string;
  component: React.ComponentType<any>;
  visible: boolean;
}[] = [
  {
    name: "user info",
    component: UserInfo,
    visible: true,
  },
  {
    name: "change password",
    component: ChangePassword,
    visible: false,
  },

  {
    name: "orders",
    component: Orders,
    visible: false,
  },
  {
    name: "favorites",
    component: Favorites,
    visible: false,
  },
  // {
  //   name: "tickets",
  //   component: Tickets,
  //   visible: false,
  // },
];

function ProfilePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<IUser>();
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Error fetching the user");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token && userId) {
      fetchUserInfo();
    } else {
      navigate("/login");
    }
  }, [token, userId, navigate]);

  const handleToggleSection = (index: number) => {
    const updatedSections = [...profileSections];
    updatedSections[index].visible = !updatedSections[index].visible;
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = async () => {
    try {
      const response = await api.delete("/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        localStorage.clear();
        navigate("/");
      } else {
        console.error("Error while trying to logout.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.profile}>
      {user && (
        <>
          <h1 className={styles.profileHeading}>
            {user.firstName} {user.lastName}
          </h1>
          <div className={styles.profileSections}>
            {profileSections.map((section, index) => {
              return (
                <div className={styles.profileSection} key={index}>
                  <h2
                    className={styles.sectionHeading}
                    onClick={() => handleToggleSection(index)}
                  >
                    {section.name}{" "}
                    {section.visible ? <BiChevronUp /> : <BiChevronDown />}
                  </h2>
                  {section.visible && section.component && (
                    <section.component user={user} />
                  )}
                  <hr className={styles.sectionLine} />
                </div>
              );
            })}
            <div className={styles.logoutContainer}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <BiLogOut></BiLogOut> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProfilePage;
