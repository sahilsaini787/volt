export async function GetArticle(slug: string) {
  const articleQuery: string = `
query getArticle($slug: ID!) {
  post(id:$slug, idType: SLUG) {
    id
    slug
    content
    author {
      node {
        firstName
        lastName
        slug
        id
        description
        avatar {
          url
        }
      }
    }
    date
    title
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
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
        query: articleQuery,
        variables: { slug },
      }),
      next: { revalidate: 90 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data.post;
  } catch (error) {
    console.log("Fetch Error: " + error);
  }
}
