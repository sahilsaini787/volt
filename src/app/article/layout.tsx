import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import PopularTags from "@/Components/PopularTags/PopularTags";
import styles from "@/app/page.module.scss";
import { GetCategories } from "@/lib/api/getCategory";
import { GetTags } from "@/lib/api/getTags";
import { TagsType } from "@/lib/types/tags";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await GetCategories();
  const tags: TagsType = await GetTags();

  return (
    <div className={styles.contentWrapper}>
      <CategoriesBar categories={categories} />
      <div className={styles.page}>
        {children}
        <PopularTags tags={tags} />
      </div>
    </div>
  );
}
