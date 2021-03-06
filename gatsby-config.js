function serialize({ query: { site, allMarkdownRemark } }) {
    return allMarkdownRemark.edges.map(edge => {
        return Object.assign(
            {},
            edge.node.frontmatter,
            {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url:
                    site.siteMetadata.siteUrl +
                    edge.node.fields.slug,
                guid:
                    site.siteMetadata.siteUrl +
                    edge.node.fields.slug,
                custom_elements: [
                    {
                        "content:encoded":
                        edge.node.html,
                    },
                ],
            },
        )
    })
}

module.exports = {
    siteMetadata: {
        title: `anothervyou`,
        logo: `a⋮`,
        author: `Killian Saint cricq`,
        siteUrl: `https://anothervyou.world`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 710,
                            withWebp: {
                                quality: 80,
                            },
                            showCaptions: ["alt", "title"],
                            quality: 80,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-117280991-1",
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                title
                                siteUrl
                                site_url: siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        serialize,
                        query: `
                            {
                                allMarkdownRemark(
                                    sort: {order: DESC, fields: [frontmatter___date]},
                                    filter: {frontmatter: {template: {eq: "post"}, draft: {ne: true}}}
                                ){
                                    edges {
                                        node {
                                            excerpt
                                            html
                                            fields { slug }
                                            frontmatter {
                                                title
                                                date
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                        output: "/rss.xml",
                        description: "a⋮ mixed feed, French and English, Français et Anglais.",
                    },
                    {
                        serialize,
                        query: `
                            {
                                allMarkdownRemark(
                                    sort: {order: DESC, fields: [frontmatter___date]},
                                    filter: {
                                        frontmatter: {template: {eq: "post"}, draft: {ne: true}},
                                        fields: { langKey: { eq: "fr" } }
                                    }
                                ){
                                    edges {
                                        node {
                                            excerpt
                                            html
                                            fields { slug }
                                            frontmatter {
                                                title
                                                date
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                        output: "/fr/rss.xml",
                        description: "a⋮ flux",
                    },
                    {
                        serialize,
                        query: `
                            {
                                allMarkdownRemark(
                                    sort: {order: DESC, fields: [frontmatter___date]},
                                    filter: {
                                        frontmatter: {template: {eq: "post"}, draft: {ne: true}},
                                        fields: { langKey: { eq: "en" } }
                                    }
                                ){
                                    edges {
                                        node {
                                            excerpt
                                            html
                                            fields { slug }
                                            frontmatter {
                                                title
                                                date
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                        output: "/en/rss.xml",
                        description: "a⋮ feed",
                    },
                ],
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-netlify`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-netlify-cache`,
    ],
}
