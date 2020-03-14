import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import PostPreview from "../../components/PostPreview/PostPreview";
import styles from "../templates.module.scss";
import { useIntl } from "react-intl";
import SEO from "../../components/SEO/SEO";
import { formatTranslations } from "../../utils/format";

export default ({
    data: { posts, translations },
    pageContext: { locale },
    location,
}) => {
    const intl = useIntl();

    const pageTranslations = formatTranslations(translations.edges);

    return (
        <Layout locale={locale} pageTranslations={pageTranslations}>
            <SEO
                description={intl.formatMessage({ id: "index_description" })}
                locale={locale}
                langKey={locale}
                pageTranslations={pageTranslations}
                location={location}
            />
            <ul className={styles.unstyledList}>
                {posts.edges.map(({ node }) => (
                    <li key={node.id}>
                        <PostPreview
                            title={node.frontmatter.title}
                            categories={node.frontmatter.categories}
                            date={node.frontmatter.date}
                            slug={node.fields.slug}
                            excerpt={node.excerpt}
                            locale={locale}
                        />
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export const query = graphql`
    query($locale: String!, $namespace: String!) {
        posts: allMarkdownRemark(
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
                            type
                        }
                    }
                }
            }
        }
        translations: allMarkdownRemark(
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
