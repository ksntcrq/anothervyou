import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import { FormattedDate } from "react-intl";
import Tags from "../components/Tags/Tags";
import styles from "./templates.module.scss";
import { Helmet } from "react-helmet";

export default ({
    data: {
        post,
        translatedPost,
        site: { siteMetadata },
    },
    pageContext: { locale },
}) => {
    return (
        <Layout
            locale={locale}
            translatedPageSlug={translatedPost.frontmatter.slug}
        >
            <Helmet>
                <title>
                    {post.frontmatter.title} - {siteMetadata.author}
                </title>
                <meta name="description" content={post.excerpt} />
                <meta
                    name="keywords"
                    content={post.frontmatter.tags.join(", ")}
                />
                <meta name="robots" content="index,follow" />
                <meta name="author" content={siteMetadata.author} />
            </Helmet>
            <article>
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
                <Tags tags={post.frontmatter.tags} />
            </article>
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!, $namespace: String!, $locale: String!) {
        site {
            siteMetadata {
                author
            }
        }
        post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            excerpt
            frontmatter {
                title
                date
                tags
            }
        }
        translatedPost: markdownRemark(
            fields: { namespace: { eq: $namespace }, langKey: { ne: $locale } }
        ) {
            frontmatter {
                slug
            }
        }
    }
`;
