import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import { FormattedDate } from "react-intl";
import Tags from "../components/Tags/Tags";
import styles from "./templates.module.scss";
import SEO from "../components/SEO/SEO";
import { formatTranslations } from "../utils/format";
import PrevNextArticle from "../components/PrevNextArticle/PrevNextArticle";

export default ({
    data: {
        post,
        prev,
        next,
        postTranslationsMarkdownRemark,
        site: { siteMetadata },
    },
    pageContext: { locale },
}) => {
    const postTranslations = formatTranslations(
        postTranslationsMarkdownRemark.edges
    );

    return (
        <Layout locale={locale} pageTranslations={postTranslations}>
            <SEO
                title={post.frontmatter.title}
                description={post.excerpt}
                author={siteMetadata.author}
                tags={post.tags}
                locale={locale}
                langKey={post.fields.langKey}
                pageTranslations={postTranslations}
            />
            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{post.frontmatter.title}</h1>
                    <time>
                        <FormattedDate
                            value={post.frontmatter.date}
                            year="numeric"
                            month="long"
                            day="numeric"
                        />
                    </time>
                </header>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                {post.frontmatter.tags && (
                    <Tags locale={locale} tags={post.frontmatter.tags} />
                )}
            </article>
            <PrevNextArticle prev={prev.nodes[0]} next={next.nodes[0]} />
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!, $namespace: String!, $locale: String!, $date: Date!) {
        site {
            siteMetadata {
                author
            }
        }
        post: markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            excerpt
            fields {
                langKey
            }
            frontmatter {
                title
                date
                tags
            }
        }
        prev: allMarkdownRemark(
            filter: {
                frontmatter: { date: { lte: $date }, draft: { ne: true } }
                fields: { langKey: { eq: $locale }, slug: { ne: $slug } }
            }
            limit: 1
            sort: { fields: frontmatter___date, order: DESC }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                }
            }
        }
        next: allMarkdownRemark(
            filter: {
                frontmatter: { date: { gte: $date }, draft: { ne: true } }
                fields: { langKey: { eq: $locale }, slug: { ne: $slug } }
            }
            limit: 1
            sort: { fields: frontmatter___date, order: ASC }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                }
            }
        }
        postTranslationsMarkdownRemark: allMarkdownRemark(
            filter: {
                frontmatter: { draft: { ne: true } }
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
