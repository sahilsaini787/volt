import type { MetadataRoute } from "next";
import type { CategoryType } from "@/lib/types/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiURL = process.env.GRAPHQL_API_URL || "";
  const baseURL = "https://volt-eosin.vercel.app";
  const latestDate = new Date("2024-11-30T00:00:00.000Z");

  //all the static URLs
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseURL}`, lastModified: latestDate },
    { url: `${baseURL}/learn`, lastModified: latestDate },
    { url: `${baseURL}/tools`, lastModified: latestDate },
    { url: `${baseURL}/contact-us`, lastModified: latestDate },
    { url: `${baseURL}/faqs`, lastModified: latestDate },
    { url: `${baseURL}/terms-and-conditions`, lastModified: latestDate },
    { url: `${baseURL}/privacy-policy`, lastModified: latestDate },
    { url: `${baseURL}/about-us`, lastModified: latestDate },
  ];

  let dynamicURLS: MetadataRoute.Sitemap = [];

  //fetch data for the dynamic URLs
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query getData {
              tags(where: {orderby: COUNT, order: DESC}, first: 10) {
                nodes {
                  slug
                }
              }
              categories {
                nodes {
                  slug
                }
              }
              posts(first: 60) {
                nodes {
                  slug
                  modified
                }
              }
              users(where: {hasPublishedPosts: POST}) {
                nodes {
                  slug
                }
              }
            }`,
      }),
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();

    //now create dynamic URLs for each type

    //CATEGORIES
    const categoriesURLs = data.categories.nodes.map(
      (category: CategoryType) => {
        return {
          url: `${baseURL}/category/${category.slug}`,
          lastModified: latestDate,
        };
      }
    );

    //TAGS
    const tagsURLs = data.tags.nodes.map((tag: { slug: string }) => {
      return { url: `${baseURL}/tag/${tag.slug}`, lastModified: latestDate };
    });

    //ARTICLES
    const articlesURLs = data.posts.nodes.map(
      (post: { slug: string; modified: Date }) => {
        return {
          url: `${baseURL}/article/${post.slug}`,
          lastModified: post.modified,
        };
      }
    );

    //AUTHORS
    const authorsURLs = data.users.nodes.map((user: { slug: string }) => {
      return {
        url: `${baseURL}/author/${user.slug}`,
        lastModified: latestDate,
      };
    });

    dynamicURLS = [
      ...categoriesURLs,
      ...tagsURLs,
      ...articlesURLs,
      ...authorsURLs,
    ];
  } catch (error) {
    console.log("FETCH ERROR: " + error);
  }

  return [...staticUrls, ...dynamicURLS];
}
