import { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import { BiMenu } from "react-icons/bi";
import DesktopNavigation from "./DesktopNavigation";
import HeaderIcons from "./HeaderIcons";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const burgerMenuSize = "2em";

  return (
    <header className={styles.header}>
      <BiMenu
        className={`${styles.menuButton}  ${menuOpen ? styles.menuOpen : ""}`}
        size={burgerMenuSize}
        onClick={toggleMenu}
      />
      {menuOpen && (
        <MobileNavigation
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
        ></MobileNavigation>
      )}
      <DesktopNavigation></DesktopNavigation>
      <Logo menuOpen={menuOpen}></Logo>
      <HeaderIcons />
    </header>
  );
}

export default Header;
