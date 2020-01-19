import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

export default ({
    data: {
        page,
        site: { siteMetadata },
    },
    pageContext: { locale },
}) => {
    return (
        <Layout locale={locale}>
            <Helmet>
                <title>
                    {page.frontmatter.title} - {siteMetadata.author}
                </title>
                <meta name="description" content={page.excerpt} />
                <meta name="robots" content="index,follow" />
            </Helmet>
            <h1>{page.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                author
            }
        }
        page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            excerpt
            frontmatter {
                title
            }
        }
    }
`;
