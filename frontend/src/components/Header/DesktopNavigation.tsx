import Navigation from "./NavigationLinks";
import styles from "./Header.module.scss";

function DesktopNavigation() {
  const isMobile = false;

  const toggleMenu: () => void = () => {};

  return (
    <nav className={styles.desktopNav}>
      <Navigation isMobile={isMobile} toggleMenu={toggleMenu}></Navigation>
    </nav>
  );
}

export default DesktopNavigation;
