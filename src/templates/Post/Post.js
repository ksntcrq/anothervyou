import React from "react";
import Layout from "../../components/Layout/Layout";
import { graphql } from "gatsby";
import { FormattedDate } from "react-intl";
import templateStyles from "../templates.module.scss";
import styles from "./Post.module.scss";
import SEO from "../../components/SEO/SEO";
import { formatTranslations } from "../../utils/format";
import PrevNextPost from "../../components/PrevNextPost/PrevNextPost";
import useEnhancedIntl from "../../hooks/useEnhancedIntl";

export default ({
    data: { mainImage, post, prev, next, translations },
    pageContext: { locale },
    location,
}) => {
    const intl = useEnhancedIntl();
    const postTranslations = formatTranslations(translations.edges);

    return (
        <Layout locale={locale} pageTranslations={postTranslations}>
            <SEO
                title={post.frontmatter.title}
                description={post.excerpt}
                tags={Object.values(post.frontmatter.categories).map(
                    intl.mapFormatMessage
                )}
                locale={locale}
                langKey={post.fields.langKey}
                pageTranslations={postTranslations}
                location={location}
                imagePathname={mainImage?.publicURL}
            />
            <article className={styles.post}>
                <header className={templateStyles.header}>
                    <h1 className={templateStyles.title}>
                        {post.frontmatter.title}
                    </h1>
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
            </article>
            <PrevNextPost prev={prev.nodes[0]} next={next.nodes[0]} />
        </Layout>
    );
};

export const query = graphql`
    query(
        $slug: String!
        $namespace: String!
        $locale: String!
        $date: Date!
        $imageName: String
    ) {
        mainImage: file(name: { eq: $imageName }) {
            publicURL
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
                categories {
                    type
                    destination
                }
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
        translations: allMarkdownRemark(
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
