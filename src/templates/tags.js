import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import { Link } from "gatsby-plugin-intl";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

export default ({
    pageContext: { locale, tag },
    data: {
        postsMarkdownRemark,
        site: { siteMetadata },
    },
}) => {
    const intl = useIntl();

    return (
        <Layout locale={locale}>
            <Helmet>
                <title>
                    {tag} - {siteMetadata.author}
                </title>
                <meta
                    name="description"
                    content={intl.formatMessage(
                        { id: "tag_description" },
                        { number: postsMarkdownRemark.totalCount, tag }
                    )}
                />
                <meta name="robots" content="index,follow" />
                <meta name="keywords" content={tag} />
            </Helmet>
            <h1>{tag}</h1>
            <ul>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <Link to={`${node.frontmatter.slug}`}>
                            {node.frontmatter.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export const query = graphql`
    query($tag: String!, $locale: String!) {
        site {
            siteMetadata {
                author
            }
        }
        postsMarkdownRemark: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: { tags: { in: [$tag] } }
                fields: { langKey: { eq: $locale } }
            }
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        slug
                    }
                }
            }
        }
    }
`;
