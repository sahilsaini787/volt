import styles from "@/Components/ArticleCard/ArticleCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
  parseDate,
  calculateTimeToReadArticle,
  parseHTMLParagraphList,
} from "@/utils/HTMLParser";
import { PostType } from "@/lib/types/postsType";

const ArticleCard = ({
  postData,
  layoutStyle,
}: {
  postData: PostType;
  layoutStyle: "grid" | "list";
}) => {
  const {
    featuredImage: {
      node: { mediaItemUrl: thumbnailURL, altText: thumbnailAltText },
    },
    date: publishDate,
    title: articleTitle,
    excerpt: articleExcerpt,
    content: articleContent,
    slug: slug,
  } = postData;

  const publishDateFormat = parseDate(publishDate);
  const timeToRead = calculateTimeToReadArticle(articleContent);
  const articleExcerptText = parseHTMLParagraphList(articleExcerpt)[0];
  return (
    <Link
      href={`/article/${slug}`}
      className={`${layoutStyle === "grid" ? styles.articleCardContainerGrid : styles.articleCardContainerList}`}
    >
      <div className={styles.articleCardThumbnailContainer}>
        <Image
          src={thumbnailURL}
          fill={true}
          style={{ objectFit: "cover" }}
          alt={thumbnailAltText}
          className={styles.articleCardThumbnail}
        />
      </div>
      <div className={styles.articleTextContentPreview}>
        <div className={styles.articleMeta}>
          <div className={styles.articlePublishDate}>{publishDateFormat}</div>
          <div className={styles.articleTimeToRead}>
            {timeToRead} {timeToRead === 1 ? "min" : "mins"}
          </div>
        </div>
        <div className={styles.articleMainPreview}>
          <div className={styles.articleTitlePreview}>{articleTitle}</div>
          <div className={styles.articleContentPreview}>
            {articleExcerptText}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
