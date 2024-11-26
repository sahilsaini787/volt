import styles from "@/Components/Navbar/Navbar.module.scss";
import Link from "next/link";
import NavbarMenu from "@/Components/Navbar/NavbarMenu/NavbarMenu";
import UserPrefs from "@/Components/Navbar/UserPrefs/UserPrefs";

const Navbar = () => {
  return (
    <div className={styles.navbarRoot}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarStart}>
          <Link href="/" className={styles.navbarStartLink}>
            <div className={styles.navbarLogo}>
              <div className={styles.navbarLogoSVGContainer}>
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  className={styles.navbarLogoSVG}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.70948 0.85888 4.71836 2 4.94999V9.5C2 11.433 3.567 13 5.5 13H7.29289L6.14645 14.1464L6.85355 14.8536L9.20711 12.5L6.85355 10.1464L6.14645 10.8536L7.29289 12H5.5C4.11929 12 3 10.8807 3 9.5V4.94999C4.14112 4.71836 5 3.70948 5 2.5C5 1.11929 3.88071 0 2.5 0Z"
                      fill="#1a2156"
                    />
                    <path
                      d="M8.85355 0.853554L8.14645 0.146446L5.79289 2.5L8.14645 4.85355L8.85355 4.14645L7.70711 3H9.5C10.8807 3 12 4.11929 12 5.5V10.05C10.8589 10.2816 10 11.2905 10 12.5C10 13.8807 11.1193 15 12.5 15C13.8807 15 15 13.8807 15 12.5C15 11.2905 14.1411 10.2816 13 10.05V5.5C13 3.567 11.433 2 9.5 2H7.70711L8.85355 0.853554Z"
                      fill="#1a2156"
                    />
                  </g>
                </svg>
              </div>
              <div className={styles.navbarLogoText}>Volt</div>
            </div>
          </Link>

          <NavbarMenu />
        </div>
        <UserPrefs />
      </div>
    </div>
  );
};

export default Navbar;
