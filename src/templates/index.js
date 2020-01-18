import React from "react";
import { graphql } from "gatsby";
import Main from "../components/Layout/Main/Main";
import { Link } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";

export default ({ data: { postsMarkdownRemark }, pageContext }) => {
    return (
        <Main {...pageContext}>
            <h1>
                <FormattedMessage id="posts" />
            </h1>
            <ul>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <h2>
                            <Link to={`${node.frontmatter.slug}`}>
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
    query($locale: String!) {
        postsMarkdownRemark: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                fields: { langKey: { eq: $locale } }
                frontmatter: { template: { eq: "post" } }
            }
        ) {
            edges {
                node {
                    id
                    fields {
                        langKey
                    }
                    excerpt
                    frontmatter {
                        slug
                        title
                    }
                }
            }
        }
    }
`;
