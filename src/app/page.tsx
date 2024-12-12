import styles from "./page.module.scss";
import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import { GetCategories } from "@/lib/api/getCategory";
import { CategoriesType } from "@/lib/types/categories";
import ArticlePreviewSection from "@/Components/ArticlePreviewSection/ArticlePreviewSection";
import { GetPosts } from "@/lib/api/getPosts";
import { TagsType } from "@/lib/types/tags";
import { GetTags } from "@/lib/api/getTags";
import PopularTags from "@/Components/PopularTags/PopularTags";

export const revalidate = 90;

export default async function Home() {
  const categories: CategoriesType = await GetCategories();
  const postsData = await GetPosts("", "", "", "143"); //143 is id of "Learning" category
  const tags: TagsType = await GetTags();

  return (
    <div className={styles.contentWrapper}>
      <CategoriesBar categories={categories} />
      <div className={styles.page}>
        <ArticlePreviewSection posts={postsData} />
        <PopularTags tags={tags} />
      </div>
    </div>
  );
}
