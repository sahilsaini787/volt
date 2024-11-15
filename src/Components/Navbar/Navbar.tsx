import styles from "@/Components/Navbar/Navbar.module.scss";
import Link from "next/link";

// type layoutStyle = "List" | "Grid";

const Navbar = () => {
  // let layout: layoutStyle = "List";
  // function handleLayout() {
  //   if (layout === "Grid") layout = "List";
  // }
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

          <div className={styles.navMenu}>
            <ul className={styles.navMenuList}>
              <li className={styles.navMenuItem}>
                <Link href="/blogs" className={styles.navMenuItemLink}>
                  Blogs
                </Link>
              </li>
              <li className={styles.navMenuItem}>
                <Link href="/tools" className={styles.navMenuItemLink}>
                  Tools
                </Link>
              </li>
              <li className={styles.navMenuItem}>
                <Link href="/learn" className={styles.navMenuItemLink}>
                  Learn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.userPrefBtns}>
          <div className={styles.switchLayoutBtnContainer}>
            <button
              className={styles.switchLayoutBtn}
              // onClick={() => handleLayout()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[1.2rem] w-[1.2rem] transition-all -rotate-90 scale-0"
              >
                <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                <path d="M14 4h7"></path>
                <path d="M14 9h7"></path>
                <path d="M14 15h7"></path>
                <path d="M14 20h7"></path>
              </svg>
              {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                  <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                </svg> */}
            </button>
          </div>
          <div className={styles.switchThemeBtnContainer}>
            <button className={styles.switchThemeBtn}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 3v1"></path>
                <path d="M12 20v1"></path>
                <path d="M3 12h1"></path>
                <path d="M20 12h1"></path>
                <path d="m18.364 5.636-.707.707"></path>
                <path d="m6.343 17.657-.707.707"></path>
                <path d="m5.636 5.636.707.707"></path>
                <path d="m17.657 17.657.707.707"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
