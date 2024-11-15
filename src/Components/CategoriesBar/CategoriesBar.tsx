import Link from "next/link";
import styles from "@/Components/CategoriesBar/CategoriesBar.module.scss";

type categoryType = {
  id: string;
  name: string;
  slug: string;
  link: string;
};

type categoriesType = {
  nodes: categoryType[];
};
const CategoriesBar = ({ nodes }: categoriesType) => {
  return (
    <div className={styles.categoreisBarContainer}>
      <ul className={styles.categoriesBarList}>
        {!nodes ? (
          <div>Loading...</div>
        ) : (
          nodes.map((category: categoryType) =>
            category.name !== "Uncategorized" ? (
              <li key={category.id} className={styles.categoriesListItem}>
                <Link
                  href={`/category/${category.slug}`}
                  className={styles.categoriesListItemLink}
                >
                  {category.name}
                </Link>
              </li>
            ) : null
          )
        )}
      </ul>
    </div>
  );
};

export default CategoriesBar;
