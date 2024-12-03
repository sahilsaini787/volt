import { fetchPosts } from "@/lib/api/postsFetcher";
import ArticlePreviewSection from "./ArticlePreviewSection";

export default async function ArticlePreviewSectionWrapper({
  category,
  tag,
}: {
  category: string;
  tag: string;
}) {
  const articlesData = await fetchPosts(category, tag);
  return <ArticlePreviewSection posts={articlesData} />;
}
