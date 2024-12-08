"use client";

import ArticleCard from "@/Components/ArticleCard/ArticleCard";
import styles from "@/Components/ArticlePreviewSection/ArticlePreviewSection.module.scss";
import { useUserContext } from "@/context/UserPrefsContext";
import { PostType } from "@/lib/types/postsType";
import { usePathname } from "next/navigation";

const ArticlePreviewSection = ({ posts }: { posts: PostType[] }) => {
  const { layoutStyle } = useUserContext();
  const pathName = usePathname();

  return (
    <div
      className={`${styles.articleContainer} ${pathName === "/learn" ? styles.learnPageLayout : ""}`}
    >
      <ul
        className={`${layoutStyle === "grid" ? styles.articleGrid : styles.articleList}`}
      >
        {posts
          ? posts.map((postData: PostType) => (
              <ArticleCard
                key={postData.id}
                postData={postData}
                layoutStyle={layoutStyle}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default ArticlePreviewSection;
