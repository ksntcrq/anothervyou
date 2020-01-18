import React from "react";
import Main from "../components/Layout/Main/Main";
import { graphql, Link } from "gatsby";

export default ({ data: { postsMarkdownRemark } }) => {
    return (
        <Main>
            <h1>Posts</h1>
            <ul>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li>
                        <h2>
                            <Link to={`/${node.fields.slug}`}>
                                {node.frontmatter.title}
                            </Link>
                        </h2>
                        <p>{node.excerpt}</p>
                    </li>
                ))}
            </ul>
        </Main>
    );
};

export const query = graphql`
    {
        postsMarkdownRemark: allMarkdownRemark(
            filter: { frontmatter: { template: { eq: "post" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    excerpt
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
