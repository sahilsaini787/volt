import ArticlePreviewSection from "@/Components/ArticlePreviewSection/ArticlePreviewSection";
import { notFound } from "next/navigation";

type ParamsType = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: ParamsType) => {
  const id = (await params).id;
  if (!id) {
    notFound();
  }
  return <ArticlePreviewSection />;
};

export default page;
