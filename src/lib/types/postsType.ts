export type PostType = {
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
      id: string;
      description: string;
      avatar: {
        url: string;
      };
    };
  };
  date: string;
  modified: string;
  categories: {
    nodes: Array<{ name: string }>;
  };
};
