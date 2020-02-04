/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: `anothervyou`,
        author: `Killian Saint cricq`,
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
                            maxWidth: 800,
                            withWebp: true,
                            showCaptions: ["alt", "title"],
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-117280991-1",
            }
        },
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-netlify`,
    ],
};
