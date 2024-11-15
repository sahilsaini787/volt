import styles from "@/Components/ArticleCard/ArticleCard.module.scss";
import Image from "next/image";
import { ArticleCardPropsType } from "@/Components/ArticlePreviewSection/ArticlePreviewSection";
import { parseHTML } from "linkedom";

const parseHTMLParagraphList = (articleContent: string) => {
  const { document } = parseHTML(articleContent);
  const pTags = document.querySelectorAll("p");
  return Array.from(pTags).map((p) => p.textContent?.trim());
};

function parseDate(publishDate: string) {
  const dateObject = new Date(publishDate);
  const publishDateFormat = dateObject.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return publishDateFormat;
}

function calculateTimeToReadArticle(articleContent: string) {
  const readSpeed = 235; //normal human reading speed per minute

  return Math.ceil(
    parseHTMLParagraphList(articleContent)
      .filter(
        (paragraphText): paragraphText is string => paragraphText !== undefined
      )
      .map((paragraphText: string) => paragraphText.split(/\s+/).length)
      .reduce(
        (accumulatedLength: number, curLength: number) =>
          accumulatedLength + curLength,
        0
      ) / readSpeed
  );
}

const ArticleCard = ({ postData }: { postData: ArticleCardPropsType }) => {
  const {
    featuredImage: {
      node: { mediaItemUrl: thumbnailURL, altText: thumbnailAltText },
    },
    date: publishDate,
    title: articleTitle,
    excerpt: articleExcerpt,
    content: articleContent,
  } = postData;

  const publishDateFormat = parseDate(publishDate);
  const timeToRead = calculateTimeToReadArticle(articleContent);
  const articleExcerptText = parseHTMLParagraphList(articleExcerpt)[0];
  return (
    <div className={styles.articleCardContainer}>
      <div className={styles.articleCardThumbnailContainer}>
        <Image
          src={thumbnailURL}
          fill={true}
          style={{ objectFit: "cover" }}
          alt={thumbnailAltText}
          className={styles.articleCardThumbnail}
        />
      </div>
      <div className={styles.articleMeta}>
        <div className={styles.articlePublishDate}>{publishDateFormat}</div>
        <div className={styles.articleTimeToRead}>
          {timeToRead} {timeToRead === 1 ? "min" : "mins"}
        </div>
      </div>
      <div className={styles.articleMainPreview}>
        <div className={styles.articleTitlePreview}>{articleTitle}</div>
        <div className={styles.articleContentPreview}>{articleExcerptText}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
