import styles from "./Header.module.scss";

interface LogoProps {
  menuOpen: boolean;
}

function Logo({ menuOpen }: LogoProps) {
  return (
    <div className={`${styles.logo} ${menuOpen ? styles.logoMenuOpen : ""}`}>
      <a className={styles.logoText} href="/">
        PAIRUN
      </a>
    </div>
  );
}

export default Logo;
