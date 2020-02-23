import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql, Link } from "gatsby";
import { useIntl } from "react-intl";
import SEO from "../components/SEO/SEO";

export default ({
    pageContext: { locale, tag },
    data: { postsMarkdownRemark },
    location,
}) => {
    const intl = useIntl();
    const translatedTag = intl.formatMessage({
        id: tag,
    });
    return (
        <Layout locale={locale}>
            <SEO
                title={translatedTag}
                description={intl.formatMessage(
                    { id: "tag_description" },
                    {
                        number: postsMarkdownRemark.totalCount,
                        tag: translatedTag,
                    }
                )}
                tags={[translatedTag]}
                locale={locale}
                langKey={locale}
                location={location}
            />
            <h1>{translatedTag}</h1>
            <ul>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <Link to={node.fields.slug}>
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
        postsMarkdownRemark: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: { tags: { in: [$tag] }, draft: { ne: true } }
                fields: { langKey: { eq: $locale } }
            }
        ) {
            totalCount
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
