import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import { Link } from "gatsby-plugin-intl";
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

    return (
        <Layout locale={locale}>
            <SEO
                title={tag}
                description={intl.formatMessage(
                    { id: "tag_description" },
                    { number: postsMarkdownRemark.totalCount, tag }
                )}
                tags={[tag]}
                author={siteMetadata.author}
                locale={locale}
                langKey={locale}
            />
            <h1>{tag}</h1>
            <ul>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <Link to={`${node.fields.slug}`}>
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
