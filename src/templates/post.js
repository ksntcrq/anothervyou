import React from "react";
import Main from "../components/Layout/Main/Main";
import { graphql } from "gatsby";

export default ({ data }) => {
    const post = data.markdownRemark;
    return (
        <Main>
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Main>
    );
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
