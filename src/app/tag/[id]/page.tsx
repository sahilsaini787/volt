import { notFound } from "next/navigation";
import { GetTags } from "@/lib/api/getTags";
import { TagType } from "@/lib/types/tags";
import { ParamsType } from "@/lib/types/paramsType";
import { GetTagSlug } from "@/lib/api/getTagSlug";
import ArticlePreviewSection from "@/Components/ArticlePreviewSection/ArticlePreviewSection";
import { GetPosts } from "@/lib/api/getPosts";

export const revalidate = 90;

export async function generateStaticParams() {
  const possibleIds: Array<{ slug: string }> = await GetTagSlug();
  return possibleIds.map((id) => ({ id: id.slug }));
}

const DisplayPostsByTags = async ({ params }: ParamsType) => {
  const tags = await GetTags();
  const id = (await params).id;

  const postsData = await GetPosts("", id, "", "");

  if (!tags.some((tag: TagType) => tag.slug === id)) {
    notFound();
  }
  return <ArticlePreviewSection posts={postsData} />;
};

export default DisplayPostsByTags;
