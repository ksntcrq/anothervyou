const path = require(`path`);
const kebabCase = require(`kebab-case`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
            postsRemark: allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
                            template
                        }
                    }
                }
            }
            tagsGroup: allMarkdownRemark(limit: 2000) {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
        }
    `);
    result.data.postsRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(
                `./src/templates/${node.frontmatter.template}.js`
            ),
            context: {
                slug: node.fields.slug,
            },
        });
    });
    result.data.tagsGroup.group.forEach(tag => {
        createPage({
            path: `/tags/${kebabCase(tag.fieldValue)}/`,
            component: path.resolve('./src/templates/tags.js'),
            context: {
                tag: tag.fieldValue,
            },
        })
    })
};
