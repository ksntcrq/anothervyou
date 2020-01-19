import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import SEO from "../components/SEO/SEO";
import { formatTranslations } from "../pages/utils/format";

export default ({
    data: {
        page,
        site: { siteMetadata },
        pageTranslationsMarkdownRemark,
    },
    pageContext: { locale },
}) => {
    const pageTranslations = formatTranslations(
        pageTranslationsMarkdownRemark.edges
    );

    return (
        <Layout locale={locale} pageTranslations={pageTranslations}>
            <SEO
                title={page.frontmatter.title}
                author={siteMetadata.author}
                description={page.excerpt}
                locale={locale}
                langKey={page.fields.langKey}
            />
            <h1>{page.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!, $locale: String!, $namespace: String!) {
        site {
            siteMetadata {
                author
            }
        }
        page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            excerpt
            fields {
                langKey
            }
            frontmatter {
                title
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
