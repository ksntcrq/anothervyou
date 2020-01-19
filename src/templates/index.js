import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";
import styles from "./templates.module.scss";
import { useIntl } from "react-intl";
import SEO from "../components/SEO/SEO";
import { formatTranslations } from "../pages/utils/format";

export default ({
    data: {
        postsMarkdownRemark,
        site: { siteMetadata },
        pageTranslationsMarkdownRemark,
    },
    pageContext: { locale },
}) => {
    const intl = useIntl();

    const pageTranslations = formatTranslations(
        pageTranslationsMarkdownRemark.edges
    );

    return (
        <Layout locale={locale} pageTranslations={pageTranslations}>
            <SEO
                title={siteMetadata.title}
                author={siteMetadata.author}
                description={intl.formatMessage({ id: "index_description" })}
                locale={locale}
                langKey={locale}
            />
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
    query($locale: String!, $namespace: String!) {
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
        pageTranslationsMarkdownRemark: allMarkdownRemark(
            filter: {
                fields: {
                    namespace: { eq: $namespace }
                    langKey: { ne: $locale }
                }
            }
        ) {
            edges {
                node {
                    fields {
                        langKey
                    }
                    frontmatter {
                        slug
                    }
                }
            }
        }
    }
`;
