import React from "react";
import Main from "../components/Layout/Main/Main";
import { graphql, Link } from "gatsby";

export default ({ pageContext, data }) => {
    const { tag } = pageContext;
    const { edges, totalCount: postCount } = data.allMarkdownRemark;

    return (
        <Main>
            <h1>
                {postCount} post(s) tagged {tag}
            </h1>
            <ul>
                {edges.map(({ node }) => (
                    <li>
                        <Link to={`/${node.fields.slug}`}>
                            {node.frontmatter.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Main>
    );
};

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
