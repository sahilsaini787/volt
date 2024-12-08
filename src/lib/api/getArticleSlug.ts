export async function GetArticleSlug(categoryToExclude: string | null = "") {
  const postsSlugQuery: string = `
  query GetPostsSlug($categoryToExclude: [ID]) {
     posts(where: 
      { 
        categoryNotIn: $categoryToExclude
      }, first: 60) {
       nodes {
         slug
        }
     }
   }
  `;

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
        query: postsSlugQuery,
        variables: { categoryToExclude },
      }),
      next: { revalidate: 90 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    if (!data || !data.posts) {
      throw new Error("Invalid GraphQL response: Missing posts slug data.");
    }

    return data.posts.nodes;
  } catch (error) {
    console.log("Fetch Error: " + error);
  }
}
