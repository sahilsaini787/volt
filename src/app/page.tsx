import PopularTagsWrapper from "@/Components/PopularTags/PopularTagsWrapper";
import styles from "./page.module.scss";
import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import { GetCategories } from "@/lib/api/getCategory";
import { CategoriesType } from "@/lib/types/categories";
import ArticlePreviewSectionWrapper from "@/Components/ArticlePreviewSection/ArticlePreviewSectionWrapper";

export const revalidate = 90;

export default async function Home() {
  const categories: CategoriesType = await GetCategories();

  return (
    <div className={styles.contentWrapper}>
      <CategoriesBar categories={categories} />
      <div className={styles.page}>
        {/* 143 is ID of "Learning" category */}
        <ArticlePreviewSectionWrapper
          categoryToExclude={"143"}
          category=""
          tag=""
        />
        <PopularTagsWrapper />
      </div>
    </div>
  );
}
