import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql, Link } from "gatsby";
import { useIntl } from "react-intl";
import SEO from "../components/SEO/SEO";

export default ({
    pageContext: { locale, tag },
    data: {
        postsMarkdownRemark,
        site: { siteMetadata },
    },
}) => {
    const intl = useIntl();
    const translatedTag = intl.formatMessage({
        id: `post_tag_${tag}`,
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
                author={siteMetadata.author}
                locale={locale}
                langKey={locale}
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
        site {
            siteMetadata {
                author
            }
        }
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
