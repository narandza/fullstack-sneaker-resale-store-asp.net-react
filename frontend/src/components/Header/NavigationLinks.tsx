import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { BiSolidRightArrow } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

interface navLinksProps {
  isMobile: boolean;
  toggleMenu: () => void;
}

export interface listLinks {
  text: string;
  href: string;
}

const navLinksData: listLinks[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Shop",
    href: "/shop",
  },
  {
    text: "Contact",
    href: "/contact",
  },
  {
    text: "About Us",
    href: "/about",
  },
];

const mobileLinkArrowSize = "0.7em";

function Navigation({ isMobile, toggleMenu }: navLinksProps) {
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(userRole === "1");
  }, [userRole, location.pathname]);

  return (
    <>
      <ul className={`${isMobile ? styles.mobNavLinks : styles.deskNavLinks}`}>
        {navLinksData.map((link, index) => {
          return (
            <Link
              to={link.href}
              key={index}
              className={styles.navLink}
              onClick={() => {
                toggleMenu();
              }}
            >
              {isMobile ? (
                <BiSolidRightArrow
                  size={mobileLinkArrowSize}
                  className={styles.navLinkArrow}
                />
              ) : (
                ""
              )}
              {link.text}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            to={"/dashboard"}
            className={styles.navLink}
            onClick={() => {
              toggleMenu();
            }}
          >
            {isMobile ? (
              <BiSolidRightArrow
                size={mobileLinkArrowSize}
                className={styles.navLinkArrow}
              />
            ) : (
              ""
            )}
            Admin Dashboard
          </Link>
        )}
      </ul>
    </>
  );
}

export default Navigation;
