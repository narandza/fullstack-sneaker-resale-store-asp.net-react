import styles from "./Header.module.scss";
import { BiX } from "react-icons/bi";
import Logo from "./Logo";
import Navigation from "./NavigationLinks";

interface MobNavProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

function MobileNavigation({ menuOpen, toggleMenu }: MobNavProps) {
  const xButtonSize = "2.2em";
  const isMobile = true;

  return (
    <>
      <nav className={`${styles.mobileNav} ${menuOpen ? styles.showMenu : ""}`}>
        <BiX
          size={xButtonSize}
          onClick={() => {
            toggleMenu();
          }}
          className={styles.xButton}
        />
        <Logo menuOpen={menuOpen}></Logo>
        <Navigation isMobile={isMobile} toggleMenu={toggleMenu}></Navigation>
      </nav>
    </>
  );
}

export default MobileNavigation;
