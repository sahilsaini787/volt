export async function GetTags() {
  const apiURL = process.env.GRAPHQL_API_URL;
  if (!apiURL) {
    throw new Error("GRAPHQL_API_URL is not defined.");
  }

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
              query getTags {
                tags(where: {orderby: COUNT, order: DESC}, first: 10) {
                  nodes {
                    name
                    id
                    slug
                    count
                  }
                }
              }`,
      }),
      next: { revalidate: 90 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data.tags.nodes;
  } catch (error) {
    console.log("FETCH ERROR: " + error);
  }
}
