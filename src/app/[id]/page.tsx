import styles from "@/app/page.module.scss";
import { notFound } from "next/navigation";
import { ParamsType } from "@/lib/types/paramsType";
import ArticlePreviewSection from "@/Components/ArticlePreviewSection/ArticlePreviewSection";
import { GetPosts } from "@/lib/api/getPosts";

// revalidate the site every 90s instead of rebuilding entire page
export const revalidate = 90;

//generate page statically based on url
export async function generateStaticParams() {
  const possibleIds = ["tools", "learn"];
  return possibleIds.map((id) => ({ id }));
}

const DisplayPosts = async ({ params }: ParamsType) => {
  const postsData = await GetPosts("Learning", "", "", "");

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
            <ArticlePreviewSection posts={postsData} />
          </div>
        </div>
      );
    default:
      notFound();
  }
};

export default DisplayPosts;
