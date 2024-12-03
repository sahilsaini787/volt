import { articleType } from "@/lib/types/articleType";
import styles from "@/Components/ArticlePage/ArticlePage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { parseDate, calculateTimeToReadArticle } from "@/utils/HTMLParser";
import { load } from "cheerio";

export default function ArticlePage({ article }: { article: articleType }) {
  const {
    content: articleContent,
    author,
    date: articlePublishDate,
    title: articleTitle,
  } = article;

  if (!articleContent) {
    return <div>No content available</div>;
  }

  //author details
  const {
    node: {
      firstName: authorFirstName,
      lastName: authorLastName,
      slug: authorSlug,
      description: authorDescription,
      avatar: authorAvatar,
    } = {},
  } = author || {};

  // convert richtext to html and add classes to
  // apply appropriate styles
  const $ = load(articleContent);
  // Add classes
  $("p:has(strong)").wrap(
    `<div class="${styles.articleParagraphHeading}"></div>`
  );
  $("p:not(:has(strong))").wrap(
    `<div class="${styles.articleParagraph}"></div>`
  );
  $("h3").wrap(`<div class="${styles.articleSubHeading}"></div>`);
  $("figure").wrap(`<div class="${styles.articleImage}"></div>`);

  const updatedArticleContent = $.html(); // Extract the updated HTML

  const publishDateFormat = parseDate(articlePublishDate || "");
  const timeToRead = calculateTimeToReadArticle(articleContent || "");

  return (
    <div className={styles.articleContainer}>
      <div className={styles.articleTitle}>{articleTitle}</div>
      <div className={styles.articleAndAuthorMetaWrapper}>
        <div className={styles.authorAvatarContainer}>
          <Image
            src={authorAvatar?.url || ""}
            fill={true}
            style={{ objectFit: "cover" }}
            alt="author_avatar"
            className={styles.authorAvatar}
          />
        </div>
        <div className={styles.articleAndAuthorMeta}>
          <div className={styles.articleAuthor}>
            <Link
              href={`/author/${authorSlug}`}
            >{`${authorFirstName} ${authorLastName}`}</Link>
          </div>
          <div className={styles.articleMeta}>
            <div className={styles.timeToRead}>
              {timeToRead} {timeToRead === 1 ? "min" : "mins"} read ·
            </div>
            <div className={styles.articlePublishDate}>{publishDateFormat}</div>
          </div>
        </div>
      </div>
      <div
        className={styles.mainArticleContent}
        dangerouslySetInnerHTML={{ __html: updatedArticleContent }}
      />
      <div className={styles.underlineSeperator}></div>
      <div className={styles.articleCredits}>
        <div className={styles.authorAvatarCreditsContainer}>
          <Image
            src={authorAvatar?.url || ""}
            fill={true}
            style={{ objectFit: "cover" }}
            alt="author_avatar"
            className={styles.authorAvatarCredits}
          />
        </div>
        <div className={styles.authorTitleCredits}>
          Written By {`${authorFirstName} ${authorLastName}`}
        </div>
        <div className={styles.authorDescriptionCredits}>
          {authorDescription}
        </div>
        <div className={styles.authorHomepageContainerCredits}>
          <Link
            href={`/author/${authorSlug}`}
            className={styles.authorHomepageCredits}
          >
            See All From {`${authorFirstName} ${authorLastName}`}
          </Link>
        </div>
      </div>
    </div>
  );
}
