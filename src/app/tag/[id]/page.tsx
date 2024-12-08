import ArticlePreviewSectionWrapper from "@/Components/ArticlePreviewSection/ArticlePreviewSectionWrapper";
import { notFound } from "next/navigation";
import { GetTags } from "@/lib/api/getTags";
import { TagType } from "@/lib/types/tags";
import { ParamsType } from "@/lib/types/paramsType";
import { GetTagSlug } from "@/lib/api/getTagSlug";

export const revalidate = 90;

export async function generateStaticParams() {
  const possibleIds: Array<{ slug: string }> = await GetTagSlug();
  return possibleIds.map((id) => ({ id: id.slug }));
}

const DisplayPostsByTags = async ({ params }: ParamsType) => {
  const tags = await GetTags();
  const id = (await params).id;
  if (!tags.some((tag: TagType) => tag.slug === id)) {
    notFound();
  }
  return <ArticlePreviewSectionWrapper category="" tag={id} />;
};

export default DisplayPostsByTags;
