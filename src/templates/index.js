import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";
import styles from "./templates.module.scss";
import { useIntl } from "react-intl";
import SEO from "../components/SEO/SEO";
import { formatTranslations } from "../utils/format";

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
                pageTranslations={pageTranslations}
            />
            <ul className={styles.unstyledList}>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <ArticlePreview
                            title={node.frontmatter.title}
                            categories={node.frontmatter.categories}
                            date={node.frontmatter.date}
                            slug={node.fields.slug}
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
                frontmatter: { template: { eq: "post" }, draft: { ne: true } }
            }
        ) {
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
                            category
                        }
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
                        slug
                    }
                }
            }
        }
    }
`;
