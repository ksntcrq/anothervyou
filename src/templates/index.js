import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import { Link } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";

export default ({ data: { postsMarkdownRemark }, pageContext }) => {
    return (
        <Layout {...pageContext}>
            <h1>
                <FormattedMessage id="posts" />
            </h1>
            <ul>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <article>
                            <h2>
                                <Link to={`${node.frontmatter.slug}`}>
                                    {node.frontmatter.title}
                                </Link>
                            </h2>
                            <p>{node.excerpt}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </Layout>
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
