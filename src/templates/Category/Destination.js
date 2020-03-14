import { graphql } from "gatsby";

import Category from "./Category";
export default Category;

export const query = graphql`
    query($category: String!, $locale: String!) {
        posts: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: {
                    categories: { destination: { eq: $category } }
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
