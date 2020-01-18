import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";
import styles from "./templates.module.scss";

export default ({ data: { postsMarkdownRemark }, pageContext: { locale } }) => {
    return (
        <Layout locale={locale}>
            <ul className={styles.unstyledList}>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <ArticlePreview
                            title={node.frontmatter.title}
                            slug={node.frontmatter.slug}
                            excerpt={node.excerpt}
                        />
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export const query = graphql`
    query($locale: String!) {
        postsMarkdownRemark: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                fields: { langKey: { eq: $locale } }
                frontmatter: { template: { eq: "post" } }
            }
        ) {
            edges {
                node {
                    id
                    fields {
                        langKey
                    }
                    excerpt
                    frontmatter {
                        slug
                        title
                    }
                }
            }
        }
    }
`;
