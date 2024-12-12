import { notFound } from "next/navigation";
import styles from "@/app/page.module.scss";
import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import PopularTagsWrapper from "@/Components/PopularTags/PopularTagsWrapper";
import { fetchArticle } from "@/lib/api/articleFetcher";
import ArticlePage from "@/Components/ArticlePage/ArticlePage";
import { CategoriesType } from "@/lib/types/categories";
import { fetchCategories } from "@/lib/api/categoryFetcher";
import { articleType } from "@/lib/types/articleType";
import { ParamsType } from "@/lib/types/paramsType";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const id = (await params).id;
  const article: articleType = await fetchArticle(id);

  if (!article) {
    return {};
  }

  const ogImageUrl = `/api/opengraph/article/${id}`;
  const siteUrl = "https://volt-eosin.vercel.app";

  return {
    metadataBase: new URL(siteUrl), // Set metadataBase
    title: article.title || "Untitled Article",
    description: "Stay up to date with the latest news.",
    openGraph: {
      title: article.title || "",
      description: `Stay up to date with the latest news.`,
      images: [
        {
          url: ogImageUrl,
          width: 640,
          height: 320,
          alt: article.featuredImage.node.altText || "Article Image",
        },
      ],
    },
  };
}

const displayArticle = async ({ params }: ParamsType) => {
  const id = (await params).id;
  const article: articleType = await fetchArticle(id);
  if (!article) {
    notFound();
  }

  const categories: CategoriesType = await fetchCategories();

  return (
    <div className={styles.contentWrapper}>
      <CategoriesBar categories={categories} />
      <div className={styles.page}>
        <ArticlePage article={article} />
        <PopularTagsWrapper />
      </div>
    </div>
  );
};

export default displayArticle;
