import React from "react";
import Main from "../components/Layout/Main/Main";
import { graphql, Link } from "gatsby";
import kebabCase from "kebab-case";

export default ({ data: { post } }) => {
    return (
        <Main>
            <h1>{post.frontmatter.title}</h1>
            <h2>{post.frontmatter.date}</h2>
            <div>
                Tags:
                <ul>
                    {post.frontmatter.tags.map(tag => (
                        <li>
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
        post: markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                tags
            }
        }
    }
`;
