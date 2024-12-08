import { notFound } from "next/navigation";
import { GetArticle } from "@/lib/api/getArticle";
import ArticlePage from "@/Components/ArticlePage/ArticlePage";
import { articlePageType } from "@/lib/types/articlePageType";
import { ParamsType } from "@/lib/types/paramsType";
import { Metadata } from "next";
import { GetArticleSlug } from "@/lib/api/getArticleSlug";

export const revalidate = 90;

export async function generateStaticParams() {
  //143 is "Learning" category id so we exclude that when searching for all the articles because it has a different tab
  const possibleIds: Array<{ slug: string }> = await GetArticleSlug("143"); //GetArticleSlug(<CategoryID to exclude>)
  return possibleIds.map((id) => ({ id: id.slug }));
}

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const id = (await params).id;
  const articlePage: articlePageType = await GetArticle(id);

  if (!articlePage) {
    return {};
  }

  const ogImageUrl = `/api/opengraph/article/${id}`;
  const siteUrl = process.env.SITE_URL || "";

  return {
    metadataBase: new URL(siteUrl), // Set metadataBase
    title: articlePage.title || "Untitled Article",
    description: "Stay up to date with the latest news.",
    openGraph: {
      title: articlePage.title || "",
      description: `Stay up to date with the latest news.`,
      images: [
        {
          url: ogImageUrl,
          width: 640,
          height: 320,
          alt: articlePage.featuredImage.node.altText || "Article Image",
        },
      ],
    },
  };
}

const displayArticle = async ({ params }: ParamsType) => {
  const id = (await params).id;
  const articlePage: articlePageType = await GetArticle(id);
  if (!articlePage) {
    notFound();
  }
  return <ArticlePage articlePage={articlePage} />;
};

export default displayArticle;
