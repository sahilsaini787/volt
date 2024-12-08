import styles from "@/app/page.module.scss";
import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import PopularTagsWrapper from "@/Components/PopularTags/PopularTagsWrapper";
import { CategoriesType } from "@/lib/types/categories";
import { GetCategories } from "@/lib/api/getCategory";
import ArticlePreviewSectionWrapper from "@/Components/ArticlePreviewSection/ArticlePreviewSectionWrapper";
import { notFound } from "next/navigation";
import { ParamsType } from "@/lib/types/paramsType";

// revalidate the site every 90s instead of rebuilding entire page
export const revalidate = 90;

//generate page statically based on url
export async function generateStaticParams() {
  const possibleIds = ["tools", "learn"];
  return possibleIds.map((id) => ({ id }));
}

const DisplayPosts = async ({ params }: ParamsType) => {
  const id = (await params).id;
  switch (id) {
    case "tools":
      return (
        <div className={styles.contentWrapper}>
          <div className={styles.page}>This is Tools Section</div>
        </div>
      );
    case "learn":
      return (
        <div className={styles.contentWrapper}>
          <div className={styles.page}>
            <ArticlePreviewSectionWrapper category="Learning" tag="" />
          </div>
        </div>
      );
    default:
      notFound();
  }
};

export default DisplayPosts;
