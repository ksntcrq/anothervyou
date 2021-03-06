import React from "react";
import Layout from "../../components/Layout/Layout";
import { graphql } from "gatsby";
import SEO from "../../components/SEO/SEO";
import { formatTranslations } from "../../utils/format";

export default ({
    data: { page, translations },
    pageContext: { locale },
    location,
}) => {
    const pageTranslations = formatTranslations(translations.edges);

    return (
        <Layout locale={locale} pageTranslations={pageTranslations}>
            <SEO
                title={page.frontmatter.title}
                description={page.excerpt}
                locale={locale}
                langKey={page.fields.langKey}
                pageTranslations={pageTranslations}
                location={location}
            />
            <h1>{page.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!, $locale: String!, $namespace: String!) {
        page: markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            excerpt
            fields {
                langKey
            }
            frontmatter {
                title
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
