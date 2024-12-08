import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import PopularTagsWrapper from "@/Components/PopularTags/PopularTagsWrapper";
import styles from "@/app/page.module.scss";
import { GetCategories } from "@/lib/api/getCategory";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await GetCategories();

  return (
    <div className={styles.contentWrapper}>
      <CategoriesBar categories={categories} />
      <div className={styles.page}>
        {children}
        <PopularTagsWrapper />
      </div>
    </div>
  );
}
