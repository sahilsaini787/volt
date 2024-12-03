import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { fetchArticle } from "@/lib/api/articleFetcher";
import { ParamsType } from "@/lib/types/paramsType";
import { articleType } from "@/lib/types/articleType";

export const runtime = "edge";

export async function GET(req: NextRequest, { params }: ParamsType) {
  const id = (await params).id;
  const article: articleType = await fetchArticle(id);

  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f5f5f5",
          fontSize: "40px",
          fontFamily: "Arial, sans-serif",
          color: "#333",
        }}
      >
        <img
          src={article.featuredImage.node.mediaItemUrl || ""}
          alt={article.featuredImage.node.altText || ""}
          style={{
            width: "40%",
            height: "18rem",
            borderRadius: "10px",
          }}
        />
        <h1
          style={{ marginTop: "20px", fontSize: "36px", textAlign: "center" }}
        >
          {article.title || "Untitled Article"}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
