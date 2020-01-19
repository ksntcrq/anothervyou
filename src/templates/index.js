import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";
import styles from "./templates.module.scss";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

export default ({
    data: {
        postsMarkdownRemark,
        site: { siteMetadata },
    },
    pageContext: { locale },
}) => {
    const intl = useIntl();

    return (
        <Layout locale={locale}>
            <Helmet>
                <title>
                    {siteMetadata.title} - {siteMetadata.author}
                </title>
                <meta
                    name="description"
                    content={intl.formatMessage({ id: 'index_description' })}
                />
                <meta name="robots" content="index,follow" />
            </Helmet>
            <ul className={styles.unstyledList}>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <ArticlePreview
                            title={node.frontmatter.title}
                            slug={node.frontmatter.slug}
                            excerpt={node.excerpt}
                        />
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export const query = graphql`
    query($locale: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
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
