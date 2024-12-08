import { notFound } from "next/navigation";
import { CategoriesType, CategoryType } from "@/lib/types/categories";
import { GetCategories } from "@/lib/api/getCategory";
import ArticlePreviewSectionWrapper from "@/Components/ArticlePreviewSection/ArticlePreviewSectionWrapper";
import { ParamsType } from "@/lib/types/paramsType";
import { GetCategorySlug } from "@/lib/api/getCategorySlug";

export const revalidate = 90;

export async function generateStaticParams() {
  const possibleIds: Array<{ slug: string }> = await GetCategorySlug();
  return possibleIds.map((id) => ({ id: id.slug }));
}

const DisplayPostsByCategory = async ({ params }: ParamsType) => {
  const categories: CategoriesType = await GetCategories();
  const id = (await params).id;
  if (!categories.some((category: CategoryType) => category.slug === id)) {
    notFound();
  }
  return <ArticlePreviewSectionWrapper category={id} tag="" />;
};

export default DisplayPostsByCategory;
