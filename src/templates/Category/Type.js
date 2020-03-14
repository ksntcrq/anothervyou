import { graphql } from "gatsby";

export { default } from "./Category";

export const query = graphql`
    query($category: String!, $locale: String!) {
        postsMarkdownRemark: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: {
                    categories: { type: { eq: $category } }
                    draft: { ne: true }
                }
                fields: { langKey: { eq: $locale } }
            }
        ) {
            totalCount
            edges {
                node {
                    id
                    fields {
                        langKey
                        slug
                    }
                    excerpt
                    frontmatter {
                        title
                        date
                        categories {
                            destination
                            type
                        }
                    }
                }
            }
        }
    }
`;
