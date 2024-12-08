"use client";

import styles from "@/Components/Navbar/UserPrefs/UserPrefs.module.scss";
import { useUserContext } from "@/context/UserPrefsContext";
import { usePathname } from "next/navigation";

export default function UserPrefs() {
  const { layoutStyle, handleLayoutChange, themeMode, handleThemeChange } =
    useUserContext();
  const currentPath = usePathname();

  return (
    <div className={styles.userPrefBtns}>
      <div className={styles.switchLayoutBtnContainer}>
        {currentPath.startsWith("/author") ||
        currentPath.startsWith("/article") ? null : (
          <button
            className={styles.switchLayoutBtn}
            onClick={handleLayoutChange}
          >
            {layoutStyle === "list" ? (
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
            ) : (
              <svg
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
              </svg>
            )}
          </button>
        )}
      </div>
      <div className={styles.switchThemeBtnContainer}>
        <button className={styles.switchThemeBtn} onClick={handleThemeChange}>
          {themeMode === "light" ? (
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
