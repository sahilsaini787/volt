import styles from "@/Components/AuthorPage/AuthorPage.module.scss";
import { PostType } from "@/lib/types/postsType";
import Image from "next/image";
import ArticleCard from "../ArticleCard/ArticleCard";

export default function AuthorPage({ posts }: { posts: PostType[] }) {
  //get author's info from one of the posts
  const {
    firstName: authorFirstName,
    lastName: authorLastName,
    description: authorDescription,
    avatar: { url: authorAvatarURL },
  } = posts[0].author.node;

  return (
    <div className={styles.authorPageContainer}>
      <div className={styles.authorPage}>
        <div className={styles.authorInfo}>
          <div className={styles.authorAvatarContainer}>
            <Image
              src={authorAvatarURL || ""}
              fill={true}
              style={{ objectFit: "cover" }}
              alt="author_avatar"
              className={styles.authorAvatar}
            />
          </div>
          <div className={styles.authorTitle}>
            {`${authorFirstName} ${authorLastName}`}
          </div>
          <div className={styles.authorDescription}>{authorDescription}</div>
        </div>
        <h2 className={styles.articleSectionHeader}>ARTICLES</h2>
        <div className={styles.articleContainer}>
          <ul className={styles.articleList}>
            {posts ? (
              posts.map((articleData: PostType) => (
                <ArticleCard
                  key={articleData.id}
                  postData={articleData}
                  layoutStyle="list"
                />
              ))
            ) : (
              <span>Loading Articles...</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
