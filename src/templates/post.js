import React from "react";
import Main from "../components/Layout/Main/Main";
import { graphql, Link } from "gatsby";
import kebabCase from "kebab-case";
import { FormattedMessage } from "react-intl"

export default ({ data: { post }, pageContext }) => {
    return (
        <Main {...pageContext}>
            <h1>{post.frontmatter.title}</h1>
            <h2>{post.frontmatter.date}</h2>
            <div>
              <FormattedMessage id="tags" />
              <ul>
                    {post.frontmatter.tags.map(tag => (
                        <li key={tag}>
                            <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Main>
    );
};

export const query = graphql`
    query($slug: String!) {
        post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                tags
            }
        }
    }
`;
