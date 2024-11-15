import ArticleCard from "@/Components/ArticleCard/ArticleCard";
import styles from "@/Components/ArticlePreviewSection/ArticlePreviewSection.module.scss";

export type ArticleCardPropsType = {
  featuredImage: {
    node: {
      altText: string;
      mediaItemUrl: string;
      mediaDetails: {
        sizes: Array<{
          sourceUrl: string;
          height: number;
          width: number;
        }>;
      };
    };
  };
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  tags: {
    nodes: Array<{ name: string }>;
  };
  author: {
    node: {
      firstName: string;
      lastName: string;
      slug: string;
    };
  };
  date: string;
  modified: string;
  categories: {
    nodes: Array<{ name: string }>;
  };
};

async function fetchPosts() {
  const apiURL = process.env.GRAPHQL_API_URL;
  if (!apiURL) {
    throw new Error("GraphQL api url is not defined");
  }
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetPosts {
          posts {
            nodes {
                featuredImage {
            node {
              altText
              mediaItemUrl
              mediaDetails {
                sizes {
                  sourceUrl
                  height
                  width
                }
              }
            }
          }
          id
          title
          excerpt
          content
          slug
          tags {
            nodes {
              name
            }
          }
          author {
            node {
              firstName
              lastName
              slug
            }
          }
          date
          modified
          categories {
            nodes {
              name
            }
          }
            }
          }
        }
      `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data.posts.nodes;
  } catch (error) {
    console.log("Fetch Error: " + error);
  }
}

const ArticlePreviewSection = async () => {
  const articlesData = await fetchPosts();
  return (
    <div className={styles.articleGridContainer}>
      <ul className={styles.articleList}>
        {articlesData ? (
          articlesData.map((articleData: ArticleCardPropsType) => (
            <ArticleCard key={articleData.id} postData={articleData} />
          ))
        ) : (
          <span>Loading Articles...</span>
        )}
      </ul>
    </div>
  );
};

export default ArticlePreviewSection;
