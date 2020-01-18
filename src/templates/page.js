import React from "react";
import Main from "../components/Layout/Main/Main";
import { graphql } from "gatsby";

export default ({ data: { page } }) => {
    return (
        <Main>
            <h1>{page.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Main>
    );
};

export const query = graphql`
    query($slug: String!) {
        page: markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
