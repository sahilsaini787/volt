export async function GetPosts(
  category: string | null = "",
  tag: string | null = "",
  author: string | null = "",
  categoryToExclude: string | null = ""
) {
  const postsQuery: string = `
query GetPosts($category: String, $tag: String, $author: String, $categoryToExclude: [ID]) {
   posts(where: 
    { 
      categoryName: $category, tag: $tag, authorName: $author, categoryNotIn: $categoryToExclude
    }, first: 60) {
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
        id
        description
        avatar {
          url
        }
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
        query: postsQuery,
        variables: { category, tag, author, categoryToExclude },
      }),
      next: { revalidate: 90 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    if (!data || !data.posts) {
      throw new Error("Invalid GraphQL response: Missing posts data.");
    }

    return data.posts.nodes;
  } catch (error) {
    console.log("Fetch Error: " + error);
  }
}
