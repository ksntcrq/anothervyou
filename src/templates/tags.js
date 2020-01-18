import React from "react";
import Main from "../components/Layout/Main/Main";
import { graphql } from "gatsby";
import { Link } from 'gatsby-plugin-intl';

export default ({ pageContext, data }) => {
    const { tag } = pageContext;
    const { edges } = data.allMarkdownRemark;

    return (
        <Main {...pageContext}>
            <h1>{tag}</h1>
            <ul>
                {edges.map(({ node }) => (
                    <li key={node.id}>
                        <Link to={`${node.frontmatter.slug}`}>
                            {node.frontmatter.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Main>
    );
};

export const query = graphql`
    query($tag: String!, $locale: String!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } }, fields: { langKey: { eq: $locale } } }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        slug
                    }
                }
            }
        }
    }
`;
