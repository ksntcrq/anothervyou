import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";

export default ({ data: { page }, pageContext }) => {
    return (
        <Layout {...pageContext}>
            <h1>{page.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!) {
        page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
