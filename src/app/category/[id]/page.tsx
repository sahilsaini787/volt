import { notFound } from "next/navigation";
import { CategoriesType, CategoryType } from "@/lib/types/categories";
import { GetCategories } from "@/lib/api/getCategory";
import { ParamsType } from "@/lib/types/paramsType";
import { GetCategorySlug } from "@/lib/api/getCategorySlug";
import ArticlePreviewSection from "@/Components/ArticlePreviewSection/ArticlePreviewSection";
import { GetPosts } from "@/lib/api/getPosts";

export const revalidate = 90;

export async function generateStaticParams() {
  const possibleIds: Array<{ slug: string }> = await GetCategorySlug();
  return possibleIds.map((id) => ({ id: id.slug }));
}

const DisplayPostsByCategory = async ({ params }: ParamsType) => {
  const categories: CategoriesType = await GetCategories();
  const id = (await params).id;
  const postsData = await GetPosts(id, "", "", "");

  if (!categories.some((category: CategoryType) => category.slug === id)) {
    notFound();
  }
  return <ArticlePreviewSection posts={postsData} />;
};

export default DisplayPostsByCategory;
