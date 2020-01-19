const path = require(`path`);
const dashify = require(`dashify`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const { name: langKey, relativeDirectory: namespace } = getNode(
            node.parent
        );
        const slug = dashify(node.frontmatter.title) || "";
        createNodeField({
            node,
            name: `langKey`,
            value: langKey,
        });
        createNodeField({
            node,
            name: `namespace`,
            value: namespace,
        });
        createNodeField({
            node,
            name: `slug`,
            value: `/${langKey}/${slug}`,
        });
    }
};

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
            pagesRemark: allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        fields {
                            langKey
                            namespace
                            slug
                        }
                        frontmatter {
                            tags
                            template
                        }
                    }
                }
            }
            tagsGroup: allMarkdownRemark {
                group(field: frontmatter___tags) {
                    fieldValue
                    edges {
                        node {
                            fields {
                                langKey
                            }
                        }
                    }
                }
            }
        }
    `);
    result.data.pagesRemark.edges.forEach(({ node }) => {
        createPage({
            path: `${node.fields.slug}`,
            component: path.resolve(
                `./src/templates/${node.frontmatter.template}.js`
            ),
            context: {
                slug: node.fields.slug,
                locale: node.fields.langKey,
                namespace: node.fields.namespace,
            },
        });
    });
    result.data.tagsGroup.group.forEach(tag => {
        const dashifiedTag = dashify(tag.fieldValue);
        tag.edges.forEach(({ node }) => {
            createPage({
                path: `/${node.fields.langKey}/tags/${dashifiedTag}`,
                component: path.resolve("./src/templates/tags.js"),
                context: {
                    tag: tag.fieldValue,
                    locale: node.fields.langKey,
                },
            });
        });
    });
};
