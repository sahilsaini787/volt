import { notFound } from "next/navigation";
import styles from "@/app/page.module.scss";
import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import PopularTagsWrapper from "@/Components/PopularTags/PopularTagsWrapper";
import { CategoriesType } from "@/lib/types/categories";
import { fetchCategories } from "@/lib/api/categoryFetcher";
import { ParamsType } from "@/lib/types/paramsType";
import AuthorPage from "@/Components/AuthorPage/AuthorPage";
import { fetchPosts } from "@/lib/api/postsFetcher";
import { PostType } from "@/lib/types/postsType";

const DisplayAuthorpage = async ({ params }: ParamsType) => {
  const categories: CategoriesType = await fetchCategories();
  const id = (await params).id;
  const posts: PostType[] = await fetchPosts("", "", id);
  if (!posts.some((post) => post.author.node.slug === id)) {
    notFound();
  }
  return (
    <div className={styles.contentWrapper}>
      <CategoriesBar categories={categories} />
      <div className={styles.page}>
        <AuthorPage posts={posts} />
        <PopularTagsWrapper />
      </div>
    </div>
  );
};

export default DisplayAuthorpage;
