"use client";

import Link from "next/link";
import styles from "@/Components/CategoriesBar/CategoriesBar.module.scss";
import { CategoriesType, CategoryType } from "@/lib/types/categories";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserPrefsContext";
import { usePathname } from "next/navigation";

const CategoriesBar = ({ categories }: { categories: CategoriesType }) => {
  const currentPathName = usePathname();
  const [showDropdownMenu, setShowDorpdownMenu] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>(currentPathName);

  useEffect(() => {
    setIsTouchDevice(navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    handleActiveCategory(currentPathName);
  }, [currentPathName]);

  function handleActiveCategory(slug: string) {
    setActiveCategory(slug);
  }

  const { themeMode } = useUserContext();
  return (
    <div
      className={`${styles.categoriesBarContainer} ${themeMode === "light" ? styles.lightMode : styles.darkMode}`}
    >
      <div
        className={styles.showCategoriesBarBtnContainer}
        onPointerOver={
          !isTouchDevice ? () => setShowDorpdownMenu(true) : undefined
        }
        onPointerOut={
          !isTouchDevice ? () => setShowDorpdownMenu(false) : undefined
        }
      >
        <button
          className={`${styles.showCategoriesBarBtn} ${showDropdownMenu ? styles.animateDropdownSVG_Up : styles.animateDropdownSVG_Down}`}
          onClick={() => {
            setShowDorpdownMenu(!showDropdownMenu);
          }}
        >
          Categories
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${styles.dropdownBtnSVG} ${showDropdownMenu ? styles.animateDropdownSVG_Up : styles.animateDropdownSVG_Down}`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <ul
          className={`${styles.categoriesBarList} 
            ${showDropdownMenu ? styles.showCategoriesBarList : styles.removeCategoriesBarList}
            ${showDropdownMenu ? styles.showCategoriesListAnimation : styles.removeCategoriesListAnimation}`}
        >
          {!categories
            ? null
            : categories.map((category: CategoryType) =>
                category.name !== "Uncategorized" &&
                category.name !== "Learning" ? (
                  <li key={category.id} className={styles.categoriesListItem}>
                    <Link
                      href={`/category/${category.slug}`}
                      className={`${styles.categoriesListItemLink} ${activeCategory === `/category/${category.slug}` ? styles.setActiveCategory : ""}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ) : null
              )}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesBar;
