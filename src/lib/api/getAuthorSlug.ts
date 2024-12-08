export async function GetAuthorSlug() {
  const apiURL = process.env.GRAPHQL_API_URL;
  if (!apiURL) {
    throw new Error("GraphQL api url is not defined");
  }

  const authorSlugQuery: string = `
    query GetAuthorSlug {
        users(where: {hasPublishedPosts: POST}) {
            nodes {
                slug
            }
        }
    }
  `;

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: authorSlugQuery,
      }),
      next: { revalidate: 90 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    if (!data || !data.users) {
      throw new Error("Invalid GraphQL response: Missing authorSlug data.");
    }

    return data.users.nodes;
  } catch (error) {
    console.log("Fetch Error: " + error);
  }
}
