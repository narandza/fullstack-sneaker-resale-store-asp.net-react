import styles from "./Footer.module.scss";
import { listLinks } from "../Header/NavigationLinks";
import { BiLogoYoutube, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { useState, useEffect } from "react";
import { IconType } from "react-icons/lib";

const footerLinksData: listLinks[] = [
  {
    text: "About Us",
    href: "/",
  },
  {
    text: "Refund Policy",
    href: "/",
  },
  {
    text: "Contact",
    href: "/",
  },
  {
    text: "Terms of Service",
    href: "/",
  },
];

const socialMedia: { href: string; icon: IconType }[] = [
  {
    href: "/",
    icon: BiLogoInstagram,
  },
  {
    href: "/",
    icon: BiLogoTwitter,
  },
  {
    href: "/",
    icon: BiLogoYoutube,
  },
];

function Footer() {
  const iconSize = "2em";
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer}>
      <span className={styles.fLine}></span>
      <div className={styles.footerTop}>
        <ul className={styles.topLinks}>
          {footerLinksData.map((link, index) => {
            return (
              <li key={index}>
                <a href={link.href} key={index}>
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
        <div className={styles.footerMid}>
          {socialMedia.map((item, index) => {
            return (
              <a href={item.href} key={index} className={styles.socialIcon}>
                <item.icon size={iconSize} />
              </a>
            );
          })}
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p> ©{currentYear} All Rights Reserved - Dimitrije Jovanovic</p>
      </div>
    </footer>
  );
}

export default Footer;
