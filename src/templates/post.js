import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import { FormattedDate } from "react-intl";
import Tags from "../components/Tags/Tags";
import styles from "./templates.module.scss";

export default ({ data: { post }, pageContext }) => {
    return (
        <Layout {...pageContext}>
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
    query($slug: String!) {
        post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
                tags
            }
        }
    }
`;
