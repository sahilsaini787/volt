import { notFound } from "next/navigation";
import { ParamsType } from "@/lib/types/paramsType";
import AuthorPage from "@/Components/AuthorPage/AuthorPage";
import { GetPosts } from "@/lib/api/getPosts";
import { PostType } from "@/lib/types/postsType";
import { GetAuthorSlug } from "@/lib/api/getAuthorSlug";

export const revalidate = 90;

export async function generateStaticParams() {
  const possibleIds: Array<{ slug: string }> = await GetAuthorSlug();
  return possibleIds.map((id) => ({ id: id.slug }));
}

const DisplayAuthorpage = async ({ params }: ParamsType) => {
  const id = (await params).id;
  const posts: PostType[] = await GetPosts("", "", id);
  if (!posts.some((post) => post.author.node.slug === id)) {
    notFound();
  }
  return <AuthorPage posts={posts} />;
};

export default DisplayAuthorpage;
